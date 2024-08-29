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

  const handleSubmit = (e) => {
    e.preventDefault();
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
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
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
                  label="Telefone"
                  name="telefone"
                  fullWidth
                  required
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
                  label="CPF"
                  name="cpf"
                  fullWidth
                  required
                />
              )}
            </InputMask>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirmar Email"
              name="confirmEmail"
              type="email"
              value={formData.confirmEmail}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              name="senha"
              type={formData.showPassword ? 'text' : 'password'}
              value={formData.senha}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 20, minLength: 6 }}
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
              label="Confirmar Senha"
              name="confirmSenha"
              type={formData.showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmSenha}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ maxLength: 20, minLength: 6 }}
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
