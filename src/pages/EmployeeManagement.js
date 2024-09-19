import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markItemAsCompleted } from '../features/process/processSlice';
import { setFilter } from '../features/employees/EmployeesSlice';
import Nav from '../components/Nav';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import { Layout, Switch, Card, Space, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import CardDefault from '../components/Card';

const { Content } = Layout;

const EmployeeManagement = () => {
  const dispatch = useDispatch();
  const item1Completed = useSelector((state) => state.process?.items[0]?.completed || false);
  const [isAdding, setIsAdding] = useState(false);

  const handleComplete = (checked) => {
    if (checked) {
      dispatch(markItemAsCompleted(1));
    }
  };

  const handleFilterActive = () => {
    dispatch(setFilter('active'));
  };

  const handleClearFilter = () => {
    dispatch(setFilter('all'));
  };

  const handleAddEmployee = () => {
    setIsAdding(true);
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  return (
    <Layout>
      <Content style={{ padding: '20px' }}>
        <Nav />
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div>
            <CardDefault />
          </div>
          <div>
            <Space direction="vertical" size={16}>
              <Card
                type="inner"
                title={
                  <div style={{ display: 'flex', justifyContent: 'start', gap: '4px', alignItems: 'center' }}>
                    {isAdding && (
                      <Button
                        type="text"
                        icon={<ArrowLeftOutlined />}
                        onClick={handleCancelAdd}
                      />
                    )}
                    Funcionário(s)
                  </div>
                }
                style={{ width: 700 }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '10px', gap: '2px' }}>
                  {!isAdding ? (
                    <>
                      <Button type="primary" ghost style={{ width: '100%', height: '3rem' }} onClick={handleAddEmployee}>
                        + Adicionar Funcionário
                      </Button>
                      <div>
                        <Button onClick={handleFilterActive}>Ver Ativos</Button>
                        <Button onClick={handleClearFilter}>Limpar filtros</Button>
                      </div>
                    </>
                  ) : (
                    <EmployeeForm />
                  )}
                </div>
                
                {!isAdding && <EmployeeList />}
                <div style={{ marginTop: '20px', justifyContent: 'flex-end' }}>
                  <span>A etapa está concluída? </span>
                  <Switch checked={item1Completed} onChange={handleComplete} />
                </div>
              </Card>

              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <Button type="primary">Próximo passo</Button>
              </div>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default EmployeeManagement;
