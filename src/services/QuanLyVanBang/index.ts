import axios from '@/utils/axios';

export namespace QuanLyVanBangAPI {
  export async function getSoVanBang() {
    return axios.get('/api/quan-ly-van-bang/so-van-bang');
  }

  export async function getQuyetDinh() {
    return axios.get('/api/quan-ly-van-bang/quyet-dinh');
  }

  export async function addSoVanBang(data: any) {
    return axios.post('/api/quan-ly-van-bang/so-van-bang', data);
  }

  export async function addQuyetDinh(data: any) {
    return axios.post('/api/quan-ly-van-bang/quyet-dinh', data);
  }

  export async function searchVanBang(params: any) {
    return axios.get('/api/quan-ly-van-bang/search', { params });
  }

  export async function recordTraCuu(idQuyetDinh: string) {
    return axios.post('/api/quan-ly-van-bang/record-tra-cuu', { idQuyetDinh });
  }
}