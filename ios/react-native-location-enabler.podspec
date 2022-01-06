#
# Be sure to run `pod lib lint react-native-location-enabler.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
    s.name             = 'react-native-location-enabler'
    s.version          = '0.1.0'
    s.summary          = 'Mocks react-native-location-enabler to prevent iOS apps from breaking.'
    s.description      = <<-DESC
    Mocks react-native-location-enabler to prevent iOS apps from breaking. 
    This makes react-native-location-enabler useable in mixed Android / iOS projects.
                         DESC
  
    s.homepage         = 'https://github.com/Jurpp/react-native-location-enabler'
    s.license          = { :type => 'MIT', :file => '../LICENSE' }
    s.author           = { 'Jurpp' => 'jurbruinink@protonmail.com' }
    s.source           = { :git => 'https://github.com/Jurpp/react-native-location-enabler.git', :tag => s.version.to_s }
  
    s.ios.deployment_target = '9.0'
    s.dependency "React"
    s.source_files = '**/*.{h,m}'
  end