import { UserGuideModule } from '@fastgpt/global/core/module/template/system/userGuide';
import { UserInputModule } from '@fastgpt/global/core/module/template/system/userInput';
import { HistoryModule } from '@fastgpt/global/core/module/template/system/abandon/history';
import { AiChatModule } from '@fastgpt/global/core/module/template/system/aiChat';
import { DatasetSearchModule } from '@fastgpt/global/core/module/template/system/datasetSearch';
import { AssignedAnswerModule } from '@fastgpt/global/core/module/template/system/assignedAnswer';
import { ClassifyQuestionModule } from '@fastgpt/global/core/module/template/system/classifyQuestion';
import { ContextExtractModule } from '@fastgpt/global/core/module/template/system/contextExtract';
import { HttpModule } from '@fastgpt/global/core/module/template/system/http';
import { RunAppModule } from '@fastgpt/global/core/module/template/system/runApp';
import { PluginInputModule } from '@fastgpt/global/core/module/template/system/pluginInput';
import { PluginOutputModule } from '@fastgpt/global/core/module/template/system/pluginOutput';
import { RunPluginModule } from '@fastgpt/global/core/module/template/system/runPlugin';
import { AiCFR } from '@fastgpt/global/core/module/template/system/coreferenceResolution';

import type {
  FlowModuleTemplateType,
  moduleTemplateListType
} from '@fastgpt/global/core/module/type.d';
import { ModuleTemplateTypeEnum } from '@fastgpt/global/core/module/constants';

export const appSystemModuleTemplates: FlowModuleTemplateType[] = [
  UserGuideModule,
  UserInputModule,
  AiChatModule,
  AssignedAnswerModule,
  DatasetSearchModule,
  RunAppModule,
  ClassifyQuestionModule,
  ContextExtractModule,
  HttpModule,
  AiCFR
];
export const pluginSystemModuleTemplates: FlowModuleTemplateType[] = [
  PluginInputModule,
  PluginOutputModule,
  AiChatModule,
  AssignedAnswerModule,
  DatasetSearchModule,
  RunAppModule,
  ClassifyQuestionModule,
  ContextExtractModule,
  HttpModule,
  AiCFR
];
export const moduleTemplatesFlat: FlowModuleTemplateType[] = [
  UserGuideModule,
  UserInputModule,
  HistoryModule,
  AiChatModule,
  DatasetSearchModule,
  AssignedAnswerModule,
  ClassifyQuestionModule,
  ContextExtractModule,
  HttpModule,
  RunAppModule,
  PluginInputModule,
  PluginOutputModule,
  RunPluginModule,
  AiCFR
];

export const moduleTemplatesList: moduleTemplateListType = [
  {
    type: ModuleTemplateTypeEnum.userGuide,
    label: 'core.module.template.Guide module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.systemInput,
    label: 'core.module.template.System input module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.tools,
    label: 'core.module.template.Tool module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.textAnswer,
    label: 'core.module.template.Response module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.functionCall,
    label: 'core.module.template.Function module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.externalCall,
    label: 'core.module.template.External module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.personalPlugin,
    label: 'core.module.template.My plugin module',
    list: []
  },
  {
    type: ModuleTemplateTypeEnum.other,
    label: '其他',
    list: []
  }
];
