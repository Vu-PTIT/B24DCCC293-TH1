import useInitModel from '@/hooks/useInitModel';

export default () => {
  const objInit = useInitModel<DichVu.IRecord>('dich-vu');

  return {
    ...objInit,
  };
};
