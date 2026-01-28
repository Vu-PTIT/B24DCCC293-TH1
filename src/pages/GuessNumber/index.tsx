
import React, { useState } from 'react';
import { Card, Input, Button, Alert, Typography, Space, Tag, Statistic } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ReloadOutlined, BulbOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const GuessNumber = () => {
    const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;

    const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
    const [userGuess, setUserGuess] = useState('');
    const [guessHistory, setGuessHistory] = useState<number[]>([]);
    const [message, setMessage] = useState<{ type: 'success' | 'warning' | 'error' | 'info'; content: string } | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const MAX_ATTEMPTS = 10;
    const attemptsLeft = MAX_ATTEMPTS - guessHistory.length;

    const handleGuess = () => {
        const guess = parseInt(userGuess);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            setMessage({ type: 'warning', content: 'Vui lòng nhập một số hợp lệ từ 1 đến 100!' });
            return;
        }

        const newHistory = [...guessHistory, guess];
        setGuessHistory(newHistory);

        if (guess === targetNumber) {
            setMessage({ type: 'success', content: 'Chúc mừng! Bạn đã đoán đúng số bí mật!' });
            setGameOver(true);
        } else if (newHistory.length >= MAX_ATTEMPTS) {
            setMessage({ type: 'error', content: `Bạn đã hết lượt! Số đúng là ${targetNumber}.` });
            setGameOver(true);
        } else if (guess < targetNumber) {
            setMessage({ type: 'info', content: 'Bạn đoán quá thấp!' });
        } else {
            setMessage({ type: 'info', content: 'Bạn đoán quá cao!' });
        }

        setUserGuess('');
    };

    const resetGame = () => {
        setTargetNumber(generateRandomNumber());
        setGuessHistory([]);
        setUserGuess('');
        setMessage(null);
        setGameOver(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !gameOver) {
            handleGuess();
        }
    };

    return (
        <PageContainer title="Trò Chơi Đoán Số">
            <Card bordered={false} style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
                <Title level={2} style={{ color: 'var(--ant-primary-color)' }}>
                    <BulbOutlined /> Đoán Số Bí Mật
                </Title>
                <Paragraph>
                    Hệ thống đã chọn một số ngẫu nhiên từ <strong>1 đến 100</strong>. Bạn có <strong>{MAX_ATTEMPTS}</strong> lượt để đoán nó!
                </Paragraph>

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Statistic title="Lượt còn lại" value={attemptsLeft} valueStyle={{ color: attemptsLeft <= 3 ? '#cf1322' : '#3f8600' }} />

                    {!gameOver && (
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Input
                                type="number"
                                placeholder="Nhập số dự đoán..."
                                value={userGuess}
                                onChange={(e) => setUserGuess(e.target.value)}
                                onKeyPress={handleKeyPress}
                                style={{ maxWidth: 200, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                autoFocus
                                min={1}
                                max={100}
                            />
                            <Button
                                type="primary"
                                onClick={handleGuess}
                                disabled={!userGuess}
                                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                            >
                                Đoán ngay
                            </Button>
                        </div>
                    )}

                    {message && (
                        <Alert
                            message={message.content}
                            type={message.type}
                            showIcon
                            style={{ textAlign: 'left' }}
                        />
                    )}

                    {gameOver && (
                        <Button type="primary" icon={<ReloadOutlined />} onClick={resetGame} size="large">
                            Chơi Lại
                        </Button>
                    )}

                    {guessHistory.length > 0 && (
                        <div>
                            <Text strong>Lịch sử đoán: </Text>
                            <br />
                            <div style={{ marginTop: 8 }}>
                                {guessHistory.map((num, index) => (
                                    <Tag key={index} color={num === targetNumber ? 'green' : index === guessHistory.length - 1 ? 'blue' : 'default'} style={{ fontSize: 14, padding: 4 }}>
                                        {num}
                                    </Tag>
                                ))}
                            </div>
                        </div>
                    )}
                </Space>
            </Card>
        </PageContainer>
    );
};

export default GuessNumber;
