import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../features/employees/EmployeesSlice';
import { List, Tag, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const status = useSelector((state) => state.employees.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading employees.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const renderMenu = (id) => (
    <Menu>
      <Menu.Item key="delete" onClick={() => handleDelete(id)}>
        Deletar
      </Menu.Item>
    </Menu>
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={employees}
      renderItem={employee => (
        <List.Item
          actions={[
            <Dropdown overlay={renderMenu(employee.id)} trigger={['click']}>
              <EllipsisOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
            </Dropdown>
          ]}
          style={{ backgroundColor: '#e3eff7', marginBottom: '10px' }}
        >
          <List.Item.Meta
            title={employee.name}
            description={(
              <div style={{ display: 'flex', gap: '10px' }}>
                <Tag>{employee.cpf}</Tag>
                <Tag>{employee.status}</Tag>
                <Tag>{employee.position}</Tag>
              </div>
            )}
          />
        </List.Item>
      )}
    />
  );
};

export default EmployeeList;
