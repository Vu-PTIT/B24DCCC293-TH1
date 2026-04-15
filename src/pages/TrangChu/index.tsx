import { Card, Row, Col } from 'antd'; // Import thêm Row, Col
import './components/style.less';
import { unitName } from '@/services/base/constant';
import { useModel } from 'umi';

const TrangChu = () => {
    const { data } = useModel('randomuser');

    return (
        <Card bodyStyle={{ height: '100%', padding: '16px' }}>
            <div className='home-welcome'>
                <Row gutter={[0, 16]} justify="center">
                    <Col span={24}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <b>{data.length} users</b>
                            <b> LÊ TUẤN VŨ</b>
                        </div>
                    </Col>

                    <Col xs={0} sm={24} style={{ textAlign: 'center' }}>
                        <img 
                            src="https://navigates.vn/wp-content/uploads/2023/04/ptit.jpg" 
                            alt="Logo" 
                            style={{ width: '300px', maxWidth: '100%', borderRadius: '8px' }}
                        />
                    </Col>
                    
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <h1 className='title' >
                            THỰC HÀNH LẬP TRÌNH WEB
                        </h1>
                        <h2 className='sub-title'>{unitName?.toUpperCase()}</h2>
                    </Col>
                </Row>
            </div>
        </Card>
    );
};

export default TrangChu;