# -*- mode: ruby -*-

require 'yaml'
require 'git'
require 'logger'
require 'redcarpet'
require 'coderay'
require 'pathname'
require 'erb'

class MarkdownRenderer < Redcarpet::Render::HTML
  def block_code(code, language)
    language = :plain if language.nil?
    CodeRay.highlight(code, language)
  end
end

def markdown(text)
  rndr = MarkdownRenderer.new(:filter_html => true, :with_toc_data => true)
  options = {
    :fenced_code_blocks => true,
    :no_intra_emphasis => true,
    :autolink => true,
    :strikethrough => true,
    :lax_html_blocks => true,
    :superscript => true
  }
  markdown_to_html = Redcarpet::Markdown.new(rndr, options)

  toc_rndr = Redcarpet::Render::HTML_TOC.new
  markdown_to_toc = Redcarpet::Markdown.new(toc_rndr, options)

  {:toc => markdown_to_toc.render(text), :content => markdown_to_html.render(text)}
end

def run_template(title, toc, content, template, topdir, projects, this_project)
  include ERB::Util
  b = binding
  ERB.new(File.read(template)).result(b)
end

namespace :code4osm do
  tasks = Array.new
  config = YAML.load(File.read('config.yml'))
  projects = YAML.load(File.read('projects.yml'))
  tmpdir = config['tmpdir'] || '/tmp/code4osm'
  raise Exception.new("Must specify target directory.") unless config.has_key?('targetdir')
  targetdir = config['targetdir']
  raise Exception.new("Must specify publish directory.") unless config.has_key?('publishdir')
  publishdir = config['publishdir']
  
  task :tmpdir do
    FileUtils.mkdir_p(tmpdir)
  end

  task :targetdir do
    FileUtils.mkdir_p(targetdir)
  end

  task :publishdir do
    FileUtils.mkdir_p(publishdir)
  end

  projects.each do |project|
    name = project['name']
    workdir = "#{tmpdir}/#{name}"
    template = project['template'] || '_templates/default.erb'
    
    namespace name.to_sym do
      task :update => [:tmpdir] do
        case project['scm']
        when 'git'
          if Dir.exist?(workdir)
            g = Git.open(workdir, :log => Logger.new(STDOUT))
            g.pull
          else
            Git.clone(project['url'], name, :path => tmpdir)
          end
          
        when 'none'
          # nothing to do, work dir is already in place
          
        else
          raise Exception.new("Unknown or unimplemented SCM #{project['scm'].inspect}.")
        end
      end
      
      task :build => [:update, :targetdir] do
        globs = project['files'] || ['**/*.md']
        workdir = project['url'] if project['scm'] == 'none'
        globs.each do |glob|
          Dir.glob("#{workdir}/#{glob}") do |file|
            reldir = Pathname.new(File.dirname(file)).relative_path_from(Pathname.new(workdir)).to_s
            topdir = Pathname.new(File.join(workdir, "..")).relative_path_from(Pathname.new(File.dirname(file))).to_s
            ext = File.extname(file)
            base = File.basename(file, ext)

            # so we can move some stuff around to make the layout
            # better for web.
            if project.has_key?('rename') and project['rename'].has_key?(base)
              base = project['rename'][base]
            end

            target_file = File.join(targetdir, name, reldir, base + '.html')
            title = base.gsub(/[ _-]/, " ").capitalize

            FileUtils.mkdir_p(File.dirname(target_file))
            File.open(target_file, "w") do |fh|
              md = markdown(File.read(file))
              fh.puts run_template(title, md[:toc], md[:content], template, topdir, projects, name)
            end
            puts "Built: #{target_file}"
          end
        end
      end

      tasks << "code4osm:#{name}:build"
    end
  end

  task :index => [:targetdir] do
    target_file = File.join(targetdir, 'index.html')
    File.open(target_file, "w") do |fh|
      fh.puts run_template("", "", "", '_templates/index.erb', ".", projects, "")
    end
  end

  task :tags => [:targetdir] do
    tags_dir = File.join(targetdir, 'tags')
    Dir.mkdir(tags_dir) unless Dir.exist?(tags_dir)
    target_file = File.join(tags_dir, 'index.html')
    File.open(target_file, "w") do |fh|
      fh.puts run_template("", "", "", '_templates/tags.erb', "..", projects, "")
    end
  end

  task :projects => [:targetdir] do
    projects_dir = File.join(targetdir, 'projects')
    Dir.mkdir(projects_dir) unless Dir.exist?(projects_dir)
    target_file = File.join(projects_dir, 'index.html')
    File.open(target_file, "w") do |fh|
      fh.puts run_template("", "", "", '_templates/projects.erb', "..", projects, "")
    end
  end

  task :static => [:targetdir] do
    FileUtils.cp_r('_static/.', "#{targetdir}/static")
  end

  task :website => [:index, :tags, :projects, :static, :publishdir, *tasks] do
    puts "Doing website"
    FileUtils.cp_r(targetdir + "/.", publishdir + "/.")
  end
end

task :default => 'code4osm:website'

