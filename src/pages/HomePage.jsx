import BoardsContainer from '@/components/BoardsContainer'
import React from 'react'
import { Input, Typography, Row, Col } from 'antd'

const { Title } = Typography

const HomePage = () => {
  return (
    <div className='w-11/12 m-auto py-6'>
      <Row justify="space-between" align="middle" className="mb-6" gutter={[16, 16]}>
        <Col>
          <Title level={3} style={{ margin: 0 }}>Boards</Title>
        </Col>
      </Row>

      <BoardsContainer />
    </div>
  )
}

export default HomePage

