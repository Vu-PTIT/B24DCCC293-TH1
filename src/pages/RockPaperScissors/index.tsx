import React, { useState } from 'react';
import { Card, Button, Row, Col, Typography, Table, Tag } from 'antd';

const { Title } = Typography;

type Choice = 'Kéo' | 'Búa' | 'Bao';

interface GameResult {
  key: number;
  player: Choice;
  computer: Choice;
  result: 'Thắng' | 'Thua' | 'Hòa';
}

const choices: Choice[] = ['Kéo', 'Búa', 'Bao'];

const RockPaperScissors: React.FC = () => {
  const [history, setHistory] = useState<GameResult[]>([]);
  const [count, setCount] = useState(1);

  const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
  };

  const getResult = (player: Choice, computer: Choice) => {
    if (player === computer) return 'Hòa';

    if (
      (player === 'Kéo' && computer === 'Bao') ||
      (player === 'Búa' && computer === 'Kéo') ||
      (player === 'Bao' && computer === 'Búa')
    ) {
      return 'Thắng';
    }

    return 'Thua';
  };

  const handlePlay = (playerChoice: Choice) => {
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    const newGame: GameResult = {
      key: count,
      player: playerChoice,
      computer: computerChoice,
      result,
    };

    setHistory([newGame, ...history]);
    setCount(count + 1);
  };

  const columns = [
    {
      title: 'Lượt',
      dataIndex: 'key',
    },
    {
      title: 'Bạn chọn',
      dataIndex: 'player',
    },
    {
      title: 'Máy chọn',
      dataIndex: 'computer',
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      render: (result: string) => {
        if (result === 'Thắng') return <Tag color="green">{result}</Tag>;
        if (result === 'Thua') return <Tag color="red">{result}</Tag>;
        return <Tag color="blue">{result}</Tag>;
      },
    },
  ];

  return (
    <Card>
      <Title level={2}>Trò Chơi Oẳn Tù Tì</Title>

      <Row gutter={16} style={{ marginBottom: 20 }}>
        {choices.map((choice) => (
          <Col key={choice}>
            <Button type="primary" onClick={() => handlePlay(choice)}>
              {choice}
            </Button>
          </Col>
        ))}
      </Row>

      <Table
        dataSource={history}
        columns={columns}
        pagination={false}
      />
    </Card>
  );
};

export default RockPaperScissors;