#import "TurboTrackingTransparency.h"
#import <AppTrackingTransparency/AppTrackingTransparency.h>
#import <Foundation/Foundation.h>
#include <memory>

@implementation TurboTrackingTransparency

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<
      facebook::react::NativeTurboTrackingTransparencySpecJSI>(params);
}

+ (NSString *)moduleName {
  return @"TurboTrackingTransparency";
}

- (NSString *)getTrackingStatus {
  if (@available(iOS 14, *)) {
    ATTrackingManagerAuthorizationStatus status =
        [ATTrackingManager trackingAuthorizationStatus];
    return [self mapStatusToString:status];
  } else {
    return @"unavailable";
  }
}

- (void)requestTrackingPermission:(nonnull RCTPromiseResolveBlock)resolve
                           reject:(nonnull RCTPromiseRejectBlock)reject {
  if (@available(iOS 14, *)) {
    [ATTrackingManager requestTrackingAuthorizationWithCompletionHandler:^(
                           ATTrackingManagerAuthorizationStatus status) {
      resolve([self mapStatusToString:status]);
    }];
  } else {
    resolve(@"unavailable");
  }
}

- (NSString *)mapStatusToString:(ATTrackingManagerAuthorizationStatus)status {
  switch (status) {
  case ATTrackingManagerAuthorizationStatusNotDetermined:
    return @"not-determined";
  case ATTrackingManagerAuthorizationStatusRestricted:
    return @"restricted";
  case ATTrackingManagerAuthorizationStatusDenied:
    return @"denied";
  case ATTrackingManagerAuthorizationStatusAuthorized:
    return @"authorized";
  default:
    return @"unavailable";
  }
}

@end
