import React, { useContext, useState } from 'react'
import { Modal, Form, Input, Button, Select, Row, Col, Typography } from 'antd'
import { AllBoardsContext } from '@/contexts/AllBoardsContext'
import { createBoard } from '@/services/boards'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const presetBackgroundImages = [
  'https://images.unsplash.com/photo-1506765515384-028b60a970df',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759',
  'https://images.unsplash.com/photo-1503264116251-35a269479413',
  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
]
const presetColors = ['orange', 'green', 'red', 'purple', 'pink', 'grey']

const Dialog = () => {
  const [form] = Form.useForm()
  const [backgroundImage, setBackgroundImage] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [isboardCreating, setIsboardCreating] = useState(false)
  const {
    setIsDialogOpen,
    allBoards,
    setAllBoards } = useContext(AllBoardsContext)

  const navigate = useNavigate()
  const handleFinish = async ({ title }) => {
    if (!title) return
    setIsboardCreating(true)
    const prefs = {
      backgroundImage,
      backgroundColor,
    }
    const newBoard = await createBoard(title, prefs)
    if (newBoard?.id) {
      setAllBoards([newBoard, ...allBoards])
      setIsDialogOpen(false)
      form.resetFields()
      navigate(`/board/${newBoard.id}`)
    }
    setIsboardCreating(false)
  }
  const handleCancel = () => {
    setIsDialogOpen(false)
  }
  return (
    <Modal
      open
      title={<Title level={4}>Create New Board</Title>}
      onCancel={handleCancel}
      footer={null}
      centered
      width={500}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Board Title"
          name="title"
          rules={[{ required: true, message: 'Please enter board title' }]}
        >
          <Input placeholder="Enter board title" />
        </Form.Item>

        <Form.Item label="Choose Background Image">
          <Row gutter={[8, 8]}>
            {presetBackgroundImages.map((img) => (
              <Col span={8} key={img}>
                <div
                  onClick={() => {
                    setBackgroundImage(img)
                    setBackgroundColor(null)
                  }}
                  style={{
                    backgroundImage: `url(${img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '60px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: backgroundImage === img ?
                      '2px solid #1890ff' : '1px solid #d9d9d9',
                  }}
                />
              </Col>
            ))}
          </Row>
        </Form.Item>

        <Form.Item label="Or Choose Background Color">
          <Row gutter={[8, 8]}>
            {presetColors.map((color) => (
              <Col span={4} key={color}>
                <div
                  onClick={() => {
                    setBackgroundColor(color)
                    setBackgroundImage(null)
                  }}
                  style={{
                    backgroundColor: color,
                    height: '60px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    border: backgroundColor === color ?
                      '2px solid #000' : '1px solid #d9d9d9',
                  }}
                />
              </Col>
            ))}
          </Row>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={isboardCreating}>
            {isboardCreating ? 'Creating Board...' : 'Create Board'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default Dialog

