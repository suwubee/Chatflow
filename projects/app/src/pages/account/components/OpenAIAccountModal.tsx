import React from 'react';
import { ModalBody, Box, Flex, Input, ModalFooter, Button } from '@chakra-ui/react';
import MyModal from '@/components/MyModal';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRequest } from '@/web/common/hooks/useRequest';
import type { UserType } from '@fastgpt/global/support/user/type.d';
import { systemEnv } from '@/web/common/system/staticData';

const OpenAIAccountModal = ({
  defaultData,
  onSuccess,
  onClose
}: {
  defaultData: UserType['openaiAccount'];
  onSuccess: (e: UserType['openaiAccount']) => Promise<any>;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      ...defaultData,
      baseUrl: systemEnv.baseUrl || defaultData?.baseUrl,
    }
  });

  const { mutate: onSubmit, isLoading } = useRequest({
    mutationFn: async () => {
      const formData = getValues();
      const dataWithFixedBaseUrl = {
        key: formData.key || '', 
        baseUrl: systemEnv.baseUrl || formData.baseUrl || '', 
      };
      return onSuccess(dataWithFixedBaseUrl);
    },
    onSuccess(res) {
      onClose();
    },
    errorToast: t('user.Set OpenAI Account Failed')
  });

  const isBaseUrlFixed = !!systemEnv.baseUrl;

  return (
    <MyModal
      isOpen
      onClose={onClose}
      iconSrc="/imgs/modal/openai.svg"
      title={t('user.OpenAI Account Setting')}
    >
      <ModalBody>
	    <Box fontSize={'sm'} color={'myGray.500'}>
          可以填写 API 的相关秘钥。如果你填写了该内容，在线上平台使用自定义的API接口
          模型不会计费（不包含知识库训练、索引生成）。请注意你的 Key 是否有访问对应模型的权限。
        </Box>
        {/* API Key Input */}
        <Flex alignItems={'center'} mt={5}>
          <Box flex={'0 0 65px'}>API Key:</Box>
          <Input flex={1} {...register('key')}></Input>
        </Flex>

        {/* BaseUrl */}
        <Flex alignItems={'center'} mt={5}>
          <Box flex={'0 0 65px'}>BaseUrl:</Box>
          {isBaseUrlFixed ? (
            <Box flex={1}>{systemEnv.baseUrl}</Box>
          ) : (
            <Input
              flex={1}
              {...register('baseUrl')}
              placeholder={'请求地址，可填中转地址，请加目录 "v1"'}
            ></Input>
          )}
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} variant={'whiteBase'} onClick={onClose}>
          取消
        </Button>
        <Button isLoading={isLoading} onClick={handleSubmit((data) => onSubmit(data))}>
          确认
        </Button>
      </ModalFooter>
    </MyModal>
  );
};

export default OpenAIAccountModal;
