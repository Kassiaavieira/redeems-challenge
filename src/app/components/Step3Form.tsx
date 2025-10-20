import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Box, TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Grid, SelectChangeEvent } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { createRedeem, getRedeemPageById } from '../../lib/api';
import { RedeemFormData, RedeemPage } from '@/types';

const estadosBrasileiros = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

interface Props {
  onNext: () => void;
  onBack: () => void;
  redeemId: string; 
  selectedProductId: string;
}

export default function Step3Form({ onNext, onBack, redeemId, selectedProductId }: Props) {
  const [form, setForm] = useState<{ [key: string]: string }>({
    redeemer_country: 'Brasil', 
    redeemer_zipcode: '',
    redeemer_street: '',
    redeemer_number: '',
    redeemer_complement: '',
    redeemer_neighborhood: '',
    redeemer_city: '',
    redeemer_state: '',
    redeemer_size: '',
  });
  const [redeemPage, setRedeemPage] = useState<RedeemPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState('');
  
  const GRAY_COLOR = '#999999';

  const standardInputStyle = {
    '& .MuiInputLabel-root': { color: GRAY_COLOR }, 
    
    '& .MuiInput-underline': {
      '&:before': {
        borderBottomColor: '#CCCCCC',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#AAAAAA',
      },
      '&:after': {
        borderBottomColor: '#CCCCCC',
      },
      '&.Mui-disabled:before': {
        borderBottomStyle: 'solid',
        borderBottomColor: '#E0E0E0',
      }
    }
  };

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await getRedeemPageById(redeemId);
        setRedeemPage(res.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.error('Erro ao buscar página de resgate:', err.message);
        } else {
          console.error('Erro inesperado:', err);
        }
      }
    };

    fetchPage();
  }, [redeemId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const fetchAddressByCep = useCallback(async (cep: string) => {
    if (cep.length === 8) {
      setLoadingCep(true);
      setCepError('');
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const data = response.data;

        if (data.erro) {
          setCepError('CEP não encontrado.');
          setForm(prev => ({
            ...prev,
            redeemer_street: '',
            redeemer_complement: '',
            redeemer_neighborhood: '',
            redeemer_city: '',
            redeemer_state: '',
          }));
        } else {
          setForm(prev => ({
            ...prev,
            redeemer_street: data.logradouro || '',
            redeemer_complement: data.complemento || '',
            redeemer_neighborhood: data.bairro || '',
            redeemer_city: data.localidade || '',
            redeemer_state: data.uf || '',
          }));
        }
      } catch (error) {
        setCepError('Erro ao buscar CEP. Tente novamente.');
        console.error('Erro ao buscar CEP:', error);
      } finally {
        setLoadingCep(false);
      }
    } else {
      setCepError('');
    }
  }, []);

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    setForm(prev => ({ ...prev, redeemer_zipcode: cep }));
    if (cep.length === 8) {
      fetchAddressByCep(cep);
    }
  };


  const handleSubmit = async () => {
    if (!redeemPage) return;

    const extra_question_responses = redeemPage.extra_questions.map(q => ({
      extra_question_id: q.id,
      answer: form[`extra_${q.id}`] || '',
    }));

    const payload: RedeemFormData = {
      redeemer_name: form['redeemer_name'] || '',
      redeemer_email: form['redeemer_email'] || '',
      redeemer_document_number: form['redeemer_document_number'] || '',
      redeemer_phone: form['redeemer_phone'] || '',
      
      redeemer_zipcode: form['redeemer_zipcode'] || '',
      redeemer_street: form['redeemer_street'] || '',
      redeemer_number: form['redeemer_number'] || '',
      redeemer_complement: form['redeemer_complement'] || '',
      redeemer_neighborhood: form['redeemer_neighborhood'] || '',
      redeemer_city: form['redeemer_city'] || '',
      redeemer_state: form['redeemer_state'] || '',
      redeemer_country: form['redeemer_country'] || 'Brasil', 

      extra_question_responses,
      
      items: [
        {
          customer_product_id: selectedProductId,
          size_name: form['redeemer_size'] || '',
        },
      ],
    };

    try {
      setLoading(true);
      await createRedeem(redeemId, payload); 
      onNext();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.error('Erro ao criar resgate:', err.message, err.response?.data);
      } else {
        console.error('Erro inesperado:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!redeemPage) return <Typography>Carregando...</Typography>;

  const selectedItem = redeemPage.items.find(i => i.customer_product_id === selectedProductId);
  
  const shouldShowSizeSelector = selectedItem && selectedItem.sizes && selectedItem.sizes.length > 0;
  const sizeGridName = selectedItem?.sizes_grid?.name || 'Produto';
  console.log(shouldShowSizeSelector)

  return (
    <Box sx={{ width: '100%', p: 0 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 800, mb: 4, color: '#353535' }}>
        Finalize o seu resgate
      </Typography>

      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#353535' }}>
        Dados do destinatário
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid size={{ xs: 12, sm: 12 }}>
          <TextField label="Nome completo" name="redeemer_name" value={form['redeemer_name'] || ''} onChange={handleChange} fullWidth required variant="standard" size="small" sx={standardInputStyle}/>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="E-mail" name="redeemer_email" value={form['redeemer_email'] || ''} onChange={handleChange} fullWidth required variant="standard" size="small" sx={standardInputStyle}/>
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="CPF ou CNPJ" name="redeemer_document_number" value={form['redeemer_document_number'] || ''} onChange={handleChange} fullWidth required variant="standard" size="small" sx={standardInputStyle}/>
        </Grid>
      </Grid>

      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#353535' }}>
          Endereço de entrega
      </Typography>
      <Grid container spacing={2} mb={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="CEP"
              name="redeemer_zipcode"
              value={form.redeemer_zipcode || ''}
              onChange={handleCepChange}
              fullWidth
              required
              variant="standard"
              size="small"
              sx={standardInputStyle}
              inputProps={{ maxLength: 8 }}
              error={!!cepError}
              helperText={cepError || loadingCep ? 'Buscando endereço...' : ''}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Rua"
              name="redeemer_street"
              value={form.redeemer_street || ''}
              onChange={handleChange}
              fullWidth
              required
              variant="standard"
              size="small"
              sx={standardInputStyle}
              disabled={loadingCep}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Número"
              name="redeemer_number"
              value={form.redeemer_number || ''}
              onChange={handleChange}
              fullWidth
              required
              variant="standard"
              size="small"
              sx={standardInputStyle}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Complemento"
              name="redeemer_complement"
              value={form.redeemer_complement || ''}
              onChange={handleChange}
              fullWidth
              variant="standard"
              size="small"
              sx={standardInputStyle}
              disabled={loadingCep}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Bairro"
              name="redeemer_neighborhood"
              value={form.redeemer_neighborhood || ''}
              onChange={handleChange}
              fullWidth
              required
              variant="standard"
              size="small"
              sx={standardInputStyle}
              disabled={loadingCep}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Cidade"
              name="redeemer_city"
              value={form.redeemer_city || ''}
              onChange={handleChange}
              fullWidth
              required
              variant="standard"
              size="small"
              sx={standardInputStyle}
              disabled={loadingCep}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required variant="standard" size="small" disabled={loadingCep} sx={standardInputStyle}> 
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                name="redeemer_state"
                value={form.redeemer_state || ''}
                onChange={handleSelectChange}
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                {estadosBrasileiros.map(uf => (
                  <MenuItem key={uf} value={uf}>{uf}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="País"
              name="redeemer_country"
              value={form.redeemer_country || 'Brasil'}
              onChange={handleChange}
              fullWidth
              required
              variant="standard"
              size="small"
              sx={standardInputStyle}
              disabled
            />
          </Grid>
        </Grid>

      {shouldShowSizeSelector && (
        <>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5, color: '#353535' }}>
            Tamanhos
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required variant="standard" size="small" sx={standardInputStyle}>
                <InputLabel>Qual o seu tamanho ({sizeGridName})?</InputLabel>
                <Select
                  name="redeemer_size"
                  value={form['redeemer_size'] || ''}
                  onChange={handleSelectChange}
                >
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  {selectedItem.sizes.map(s => (
                    <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </>
      )}

      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1.5}}>Perguntas Extras</Typography>
      <Grid container spacing={2} mb={3}>
        {redeemPage.extra_questions.map(q => (
          <Grid size={{ xs: 12, sm: 6 }} key={q.id}>
            {q.answer_type === 'text' && (
              <TextField
                label={q.question}
                name={`extra_${q.id}`}
                value={form[`extra_${q.id}`] || ''}
                onChange={handleChange}
                fullWidth
                variant="standard"
                size="small"
                sx={standardInputStyle}
              />
            )}
            {q.answer_type === 'date' && (
              <TextField
                label={q.question}
                type="date"
                name={`extra_${q.id}`}
                value={form[`extra_${q.id}`] || ''}
                onChange={handleChange}
                fullWidth
                variant="standard"
                size="small"
                InputLabelProps={{ shrink: true }}
                sx={standardInputStyle}
              />
            )}
            {q.answer_type === 'select_one' && (
              <FormControl fullWidth variant="standard" size="small" sx={standardInputStyle}>
                <InputLabel>{q.question}</InputLabel>
                <Select
                  name={`extra_${q.id}`}
                  value={form[`extra_${q.id}`] || ''}
                  onChange={handleSelectChange}
                >
                  <MenuItem value=""><em>Selecione</em></MenuItem>
                  {q.options.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button 
          variant="outlined" 
          onClick={onBack} 
          sx={{ 
            minWidth: 100,
            fontWeight: 600,
            borderRadius: '12px',
            padding: '8px 16px', 
            textTransform: 'none',
            color: GRAY_COLOR, 
            borderColor: GRAY_COLOR,
            '&:hover': {
              borderColor: '#666666', 
              bgcolor: 'rgba(153, 153, 153, 0.04)', 
            }
          }}
        >
          Voltar
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit} 
          disabled={loading || loadingCep}
          sx={{
            minWidth: 100,
            fontWeight: 600,
            color: 'white',
            borderRadius: '12px',
            padding: '8px 16px',
            textTransform: 'none', 
          }}
        >
          Continuar
        </Button>
      </Box>
      <Typography variant="caption" display="block" align="center" mt={3} color="#999">
          © 2023 - Empresa X em parceria com a Lobby
      </Typography>
    </Box>
  );
}