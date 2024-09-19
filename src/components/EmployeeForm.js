import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Form, Input, Button, DatePicker, Checkbox, Select, Radio, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/employees/EmployeesSlice';
import moment from 'moment';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm();
  const [epiStatus, setEpiStatus] = useState(false);

  const { append } = useFieldArray({
    control,
    name: 'employees'
  });

  const onSubmit = (data) => {
    const employeeData = {
      ...data,
      data_birth: moment(data.data_birth).format('YYYY-MM-DD')
    };

    dispatch(addUser(employeeData)).then(() => {
      reset();
    });
  };

  const handleEpiStatusChange = (e) => {
    setEpiStatus(e.target.checked);
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
      <Form.Item label="O trabalhador está ativo ou inativo?">
        <Controller
          name="status"
          control={control}
          defaultValue="Ativo"
          render={({ field }) => (
            <Select {...field}>
              <Option value="Ativo">Ativo</Option>
              <Option value="Inativo">Inativo</Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item label="Nome">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Sexo">
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio value="Feminino">Feminino</Radio>
              <Radio value="Masculino">Masculino</Radio>
            </Radio.Group>
          )}
        />
      </Form.Item>
      <Form.Item label="CPF">
        <Controller
          name="cpf"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Data de Nascimento">
        <Controller
          name="data_birth"
          control={control}
          defaultValue={null}
          rules={{ required: true }}
          render={({ field }) => (
            <DatePicker
              {...field}
              format="YYYY-MM-DD"
              value={field.value ? moment(field.value) : null}
              onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : null)}
            />
          )}
        />
      </Form.Item>
      <Form.Item label="RG">
        <Controller
          name="rg"
          control={control}
          defaultValue=""
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Cargo">
        <Controller
          name="position"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => <Input {...field} />}
        />
      </Form.Item>
      <Form.Item label="Quais EPIs o trabalhador usa na atividade?">
        <Controller
          name="epi_status"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox {...field} checked={field.value} onChange={(e) => {
              field.onChange(e.target.checked);
              handleEpiStatusChange(e);
            }}>
              O trabalhador não usa EPI.
            </Checkbox>
          )}
        />
      </Form.Item>
      {epiStatus && (
        <>
          <Form.Item label="Selecione a atividade">
            <Controller
              name="activity"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Form.Item label="Selecione o EPI">
            <Controller
              name="epi_options"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field}>
                  <Option value="Calçado de segurança">Calçado de segurança</Option>
                  <Option value="Capacete">Capacete</Option>
                  <Option value="Luva">Luva</Option>
                </Select>
              )}
            />
          </Form.Item>
          <Form.Item label="Informe o número do CA">
            <Controller
              name="ca"
              control={control}
              defaultValue=""
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
          <Button onClick={() => append({})}>Adicionar outra atividade</Button>
        </>
      )}
      <Form.Item label="Adicione Atestado de Saúde (opcional):">
        <Controller
          name="health_certification.doc"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Upload {...field} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Selecionar arquivo</Button>
            </Upload>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Salvar</Button>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;
