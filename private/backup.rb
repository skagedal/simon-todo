#!/usr/bin/env ruby

require 'pathname';
require 'date';

if (ARGV.length > 0)
  basedir = Pathname(ARGV[0])
else
  basedir = Pathname('.')
end

outdir = basedir + DateTime.now.iso8601

begin
  outdir.mkdir
rescue Errno::ENOENT
  abort "Can't create output directory at #{outdir.to_s}."
end

system("mmongo dump -o #{outdir}")




