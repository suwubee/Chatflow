import React, { useEffect, useMemo, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Box,
  Button
} from '@chakra-ui/react';
import { BillSourceEnum, BillSourceMap } from '@fastgpt/global/support/wallet/bill/constants';
import { getUserBills } from '@/web/support/wallet/bill/api';
import type { BillItemType } from '@fastgpt/global/support/wallet/bill/type';
import { usePagination } from '@/web/common/hooks/usePagination';
import { useLoading } from '@/web/common/hooks/useLoading';
import dayjs from 'dayjs';
import MyIcon from '@fastgpt/web/components/common/Icon';
import DateRangePicker, { type DateRangeType } from '@/components/DateRangePicker';
import { addDays } from 'date-fns';
import dynamic from 'next/dynamic';
import { useSystemStore } from '@/web/common/system/useSystemStore';
import { useTranslation } from 'next-i18next';
import MySelect from '@/components/Select';
import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/web/support/user/useUserStore';
import { getTeamMembers } from '@/web/support/user/team/api';
import Avatar from '@/components/Avatar';
const BillDetail = dynamic(() => import('./BillDetail'));

const BillTable = () => {
  const { t } = useTranslation();
  const { Loading } = useLoading();
  const [dateRange, setDateRange] = useState<DateRangeType>({
    from: addDays(new Date(), -7),
    to: new Date()
  });
  const [billSource, setBillSource] = useState<`${BillSourceEnum}` | ''>('');
  const { isPc } = useSystemStore();
  const { userInfo } = useUserStore();
  const [billDetail, setBillDetail] = useState<BillItemType>();

  const sourceList = useMemo(
    () => [
      { label: t('common.All'), value: '' },
      ...Object.entries(BillSourceMap).map(([key, value]) => ({ label: value.label, value: key }))
    ],
    [t]
  );

  const [selectTmbId, setSelectTmbId] = useState(userInfo?.team?.tmbId);
  const { data: members = [] } = useQuery(['getMembers', userInfo?.team?.teamId], () => {
    if (!userInfo?.team?.teamId) return [];
    return getTeamMembers(userInfo.team.teamId);
  });
  const tmbList = useMemo(
    () =>
      members.map((item) => ({
        label: (
          <Flex alignItems={'center'}>
            <Avatar src={item.avatar} w={'16px'} mr={1} />
            {item.memberName}
          </Flex>
        ),
        value: item.tmbId
      })),
    [members]
  );
  console.log(members);

  const {
    data: bills,
    isLoading,
    Pagination,
    getData
  } = usePagination<BillItemType>({
    api: getUserBills,
    pageSize: isPc ? 20 : 10,
    params: {
      dateStart: dateRange.from || new Date(),
      dateEnd: addDays(dateRange.to || new Date(), 1),
      source: billSource,
      teamMemberId: selectTmbId
    },
    defaultRequest: false
  });

  useEffect(() => {
    getData(1);
  }, [billSource, selectTmbId]);

  return (
    <Flex flexDirection={'column'} py={[0, 5]} h={'100%'} position={'relative'}>
      <Flex
        flexDir={['column', 'row']}
        gap={2}
        w={'100%'}
        px={[3, 8]}
        alignItems={['flex-end', 'center']}
      >
        {tmbList.length > 1 && userInfo?.team?.canWrite && (
          <Flex alignItems={'center'}>
            <Box mr={2} flexShrink={0}>
              {t('support.user.team.member')}
            </Box>
            <MySelect
              size={'sm'}
              minW={'100px'}
              list={tmbList}
              value={selectTmbId}
              onchange={setSelectTmbId}
            />
          </Flex>
        )}
        <Box flex={'1'} />
        <Flex alignItems={'center'} gap={3}>
          <DateRangePicker
            defaultDate={dateRange}
            position="bottom"
            onChange={setDateRange}
            onSuccess={() => getData(1)}
          />
          <Pagination />
        </Flex>
      </Flex>
      <TableContainer px={[3, 8]} position={'relative'} flex={'1 0 0'} h={0} overflowY={'auto'}>
        <Table>
          <Thead>
            <Tr>
              {/* <Th>{t('user.team.Member Name')}</Th> */}
              <Th>{t('user.Time')}</Th>
              <Th>
                <MySelect
                  list={sourceList}
                  value={billSource}
                  size={'sm'}
                  onchange={(e) => {
                    setBillSource(e);
                  }}
                  w={'130px'}
                ></MySelect>
              </Th>
              <Th>{t('user.Application Name')}</Th>
              <Th>{t('user.Total Amount')}</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody fontSize={'sm'}>
            {bills.map((item) => (
              <Tr key={item.id}>
                {/* <Td>{item.memberName}</Td> */}
                <Td>{dayjs(item.time).format('YYYY/MM/DD HH:mm:ss')}</Td>
                <Td>{BillSourceMap[item.source]?.label}</Td>
                <Td>{t(item.appName) || '-'}</Td>
                <Td>{item.total}元</Td>
                <Td>
                  <Button size={'sm'} variant={'whitePrimary'} onClick={() => setBillDetail(item)}>
                    详情
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {!isLoading && bills.length === 0 && (
        <Flex flex={'1 0 0'} flexDirection={'column'} alignItems={'center'}>
          <MyIcon name="empty" w={'48px'} h={'48px'} color={'transparent'} />
          <Box mt={2} color={'myGray.500'}>
            无使用记录~
          </Box>
        </Flex>
      )}

      <Loading loading={isLoading} fixed={false} />
      {!!billDetail && <BillDetail bill={billDetail} onClose={() => setBillDetail(undefined)} />}
    </Flex>
  );
};

export default React.memo(BillTable);
