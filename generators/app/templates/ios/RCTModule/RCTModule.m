#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(<%= moduleName %>, NSObject)

RCT_EXTERN_METHOD(<%= reactMethodName %>:(NSString *)id)

@end
