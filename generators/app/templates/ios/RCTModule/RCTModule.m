#import "RCT<%= moduleName %>.h"

@implementation <%= moduleName %>

RCT_EXPORT_MODULE();

RCT_REMAP_METHOD(<%= reactMethodName %>,
                 resolver:(RCTPromiseResolveBlock)resolve
                 rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@"Hello World!");
}

@end
