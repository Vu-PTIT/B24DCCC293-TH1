import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<LichHen.IRecord>('lich-hen');

  return {
    ...objInit,
  };
};
