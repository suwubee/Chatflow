import React from 'react';
import { ModalBody, Box, Flex, Input, ModalFooter, Button } from '@chakra-ui/react';
import MyModal from '@fastgpt/web/components/common/MyModal';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { useRequest } from '@fastgpt/web/hooks/useRequest';
import type { UserType } from '@fastgpt/global/support/user/type.d';
import { feConfigs } from '@/web/common/system/staticData';

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
      baseUrl: feConfigs.baseUrl || defaultData?.baseUrl
    }
  });

  const { mutate: onSubmit, isLoading } = useRequest({
    mutationFn: async () => {
      const formData = getValues();
      const dataWithFixedBaseUrl = {
        key: formData.key || '',
        baseUrl: feConfigs.baseUrl || formData.baseUrl || ''
      };
      return onSuccess(dataWithFixedBaseUrl);
    },
    onSuccess(res) {
      onClose();
    },
    errorToast: t('common:user.Set OpenAI Account Failed')
  });

  const isBaseUrlFixed = !!feConfigs.baseUrl;

  return (
    <MyModal
      isOpen
      onClose={onClose}
      iconSrc="common/openai"
      title={t('common:user.OpenAI Account Setting')}
    >
      <ModalBody>
        <Box fontSize={'sm'} color={'myGray.500'}>
          {t('common:info.open_api_notice')}
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
            <Box flex={1}>{feConfigs.baseUrl}</Box>
          ) : (
            <Input
              flex={1}
              {...register('baseUrl')}
              placeholder={t('common:info.open_api_placeholder')}
            ></Input>
          )}
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} variant={'whiteBase'} onClick={onClose}>
          {t('common:common.Cancel')}
        </Button>
        <Button isLoading={isLoading} onClick={handleSubmit((data) => onSubmit(data))}>
          {t('common:common.Confirm')}
        </Button>
      </ModalFooter>
    </MyModal>
  );
};

export default OpenAIAccountModal;
