#import "RNReactNativeLocationEnabler.h"
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>

@implementation RNReactNativeLocationEnabler : NSObject

RCT_EXPORT_MODULE(LocationEnabler);

@synthesize bridge = _bridge;

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(checkSettings: (NSDictionary*) config){
    RCTLogInfo(@"Call to checkSettings().");
    return nil;
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(requestResolutionSettings: (NSDictionary*) config){
    RCTLogInfo(@"Call to requestResolutionSettings().");
    return nil;
}

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

@end