Code 4 OSM
==========

A site which brings together resources for those developing software
using OSM data, or part of the OSM infrastructure.

This is a really simple bit of Ruby software to pull together
documentation from various places and try to arrange and style it into
some sort of cohesive and useful site.

Generating the website
======================

To generate the website, you will need Ruby and several Ruby gems
installed. I recommend using [rbenv](http://rbenv.org/) to manage your
Ruby versions, but this should also work with Ruby installed by your
system packages. For example, on Ubuntu:

    sudo apt-get install ruby

The gems which the site needs are managed with "bundler", itself a
gem. To install these (on Linux, but probably other systems too) you
will need to run:

    gem install bundler
    bundle install

Please see the [docs for bundler](http://bundler.io/) for any platform
specific install instructions.

You will also need to create the configuration file `config.yml`. A
template for this is provided in `example.config.yml` which contains
the three items you will need to configure:

* `tmpdir` is the filesystem path where temporary checked-out versions
  of projects and other files needed during the assembly of the site
  will be stored. This could be somewhere in `/tmp` on a UNIX system.
* `targetdir` is where the site is finally assembled before being
  published.
* `publishdir` is where the assembled site is copied to for
  deployment, for example somewhere in `/var/www` or `~/public_html`
  on a system running Apache or similar web servers.

Once `config.yml` has been created, you can just type:

    rake

This will perform all the necessary work to build, assemble and
publish the site to the `publishdir` directory.

Contributing
============

If you see a problem, please [report an
issue](https://github.com/zerebubuth/code4osm.org/issues) or, even
better, fork [the
repository](https://github.com/zerebubuth/code4osm.org) and submit a
pull request for the fix.

We encourage documentation to be written and maintained as close as
possible to the source code, and within the repository of the original
project. Code4OSM imports this documentation, but aims not to
duplicate it.

