import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import InputMask from 'react-input-mask';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Form = ({ onSubmit, user }) => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    email: '',
    confirmEmail: '',
    senha: '',
    confirmSenha: '',
    showPassword: false,
    showConfirmPassword: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        nome: user.nome || '',
        telefone: user.telefone || '',
        cpf: user.cpf || '',
        email: user.email || '',
        confirmEmail: user.confirmEmail || '',
        senha: user.senha || '',
        confirmSenha: user.confirmSenha || '',
        showPassword: false,
        showConfirmPassword: false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.telefone) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.cpf) newErrors.cpf = 'CPF é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.confirmEmail) newErrors.confirmEmail = 'Confirmar Email é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (!formData.confirmSenha) newErrors.confirmSenha = 'Confirmar Senha é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (formData.email !== formData.confirmEmail) {
      alert('Os e-mails não coincidem!');
      return;
    }
    if (formData.senha !== formData.confirmSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    onSubmit(formData);
  };

  const toggleShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const toggleShowConfirmPassword = () => {
    setFormData({ ...formData, showConfirmPassword: !formData.showConfirmPassword });
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        padding: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {user ? 'Editar Usuário' : 'Cadastro de Usuário'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="nome"
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.nome}
              helperText={errors.nome}
              inputProps={{ maxLength: 50, minLength: 3 }}
            />
          </Grid>
          <Grid item xs={12}>
            <InputMask
              mask="(99) 99999-9999"
              value={formData.telefone}
              onChange={handleChange}
            >
              {() => (
                <TextField
                  id="telefone"
                  label="Telefone"
                  name="telefone"
                  fullWidth
                  required
                  error={!!errors.telefone}
                  helperText={errors.telefone}
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={12}>
            <InputMask
              mask="999.999.999-99"
              value={formData.cpf}
              onChange={handleChange}
            >
              {() => (
                <TextField
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  fullWidth
                  required
                  error={!!errors.cpf}
                  helperText={errors.cpf}
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="email"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="confirmEmail"
              label="Confirmar Email"
              name="confirmEmail"
              type="email"
              value={formData.confirmEmail}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.confirmEmail}
              helperText={errors.confirmEmail}
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="senha"
              label="Senha"
              name="senha"
              type={formData.showPassword ? 'text' : 'password'}
              value={formData.senha}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.senha}
              helperText={errors.senha}
              inputProps={{ maxLength: 20, minLength: 8 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword}>
                      {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="confirmSenha"
              label="Confirmar Senha"
              name="confirmSenha"
              type={formData.showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmSenha}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.confirmSenha}
              helperText={errors.confirmSenha}
              inputProps={{ maxLength: 20, minLength: 8 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowConfirmPassword}>
                      {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              id="submit"
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {user ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Form;
