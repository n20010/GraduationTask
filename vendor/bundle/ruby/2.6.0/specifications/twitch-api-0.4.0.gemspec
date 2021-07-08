# -*- encoding: utf-8 -*-
# stub: twitch-api 0.4.0 ruby lib

Gem::Specification.new do |s|
  s.name = "twitch-api".freeze
  s.version = "0.4.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Maurice Wahba".freeze]
  s.bindir = "exe".freeze
  s.date = "2019-01-03"
  s.email = ["maurice.wahba@gmail.com".freeze]
  s.homepage = "https://github.com/mauricew/ruby-twitch-api".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "3.0.3".freeze
  s.summary = "Ruby client for the Twitch Helix API.".freeze

  s.installed_by_version = "3.0.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<faraday>.freeze, [">= 0.12.2"])
      s.add_runtime_dependency(%q<faraday_middleware>.freeze, ["~> 0.12"])
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.16"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_development_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<webmock>.freeze, ["~> 3.1"])
      s.add_development_dependency(%q<vcr>.freeze, ["~> 3.0"])
    else
      s.add_dependency(%q<faraday>.freeze, [">= 0.12.2"])
      s.add_dependency(%q<faraday_middleware>.freeze, ["~> 0.12"])
      s.add_dependency(%q<bundler>.freeze, ["~> 1.16"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<webmock>.freeze, ["~> 3.1"])
      s.add_dependency(%q<vcr>.freeze, ["~> 3.0"])
    end
  else
    s.add_dependency(%q<faraday>.freeze, [">= 0.12.2"])
    s.add_dependency(%q<faraday_middleware>.freeze, ["~> 0.12"])
    s.add_dependency(%q<bundler>.freeze, ["~> 1.16"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<webmock>.freeze, ["~> 3.1"])
    s.add_dependency(%q<vcr>.freeze, ["~> 3.0"])
  end
end
