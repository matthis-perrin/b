import {Configuration, ResolvePluginInstance, RuleSetRule} from 'webpack';

type Unpack<T> = T extends (infer U)[] ? U : never;
export type WebpackPlugin = Unpack<Configuration['plugins']>;
export type WebpackLoader = RuleSetRule;
export type WebpackResolver = ResolvePluginInstance;
