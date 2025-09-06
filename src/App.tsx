import React, { useState } from 'react';
import { Users, User, GraduationCap, Building2, Truck, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';

type Screen = 'home' | 'pessoa-fisica' | 'pessoa-juridica' | 'professor' | 'fornecedor' | 'aluno';
type FeedbackType = 'success' | 'error' | null;

interface Feedback {
  type: FeedbackType;
  message: string;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [feedback, setFeedback] = useState<Feedback>({ type: null, message: '' });

  const showFeedback = (type: FeedbackType, message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: null, message: '' }), 3000);
  };

  const handleSubmit = (formType: string) => {
    showFeedback('success', `Cadastro de ${formType} realizado com sucesso!`);
  };

  const handleCancel = () => {
    showFeedback('error', 'Operação cancelada pelo usuário.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Sistema de Cadastros - ADS</h1>
            {currentScreen !== 'home' && (
              <button
                onClick={() => setCurrentScreen('home')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                Voltar ao Início
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Feedback Messages */}
      {feedback.type && (
        <div className={`max-w-6xl mx-auto px-4 mt-4`}>
          <div className={`flex items-center gap-3 p-4 rounded-lg ${
            feedback.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {feedback.type === 'success' ? (
              <CheckCircle size={24} />
            ) : (
              <XCircle size={24} />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {currentScreen === 'home' ? (
          <HomeScreen onNavigate={setCurrentScreen} />
        ) : (
          <FormScreen 
            screen={currentScreen} 
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-lg font-semibold mb-2">Projeto Integrador - Análise e Desenvolvimento de Sistemas</p>
          <p className="text-gray-300">Protótipos Funcionais - 2ª Etapa</p>
        </div>
      </footer>
    </div>
  );
}

function HomeScreen({ onNavigate }: { onNavigate: (screen: Screen) => void }) {
  const cadastros = [
    {
      id: 'pessoa-fisica' as Screen,
      title: 'Pessoa Física',
      description: 'Cadastro de pessoas físicas no sistema',
      icon: User,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'pessoa-juridica' as Screen,
      title: 'Pessoa Jurídica',
      description: 'Cadastro de empresas e organizações',
      icon: Building2,
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      id: 'professor' as Screen,
      title: 'Professor',
      description: 'Cadastro de professores e educadores',
      icon: GraduationCap,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      id: 'fornecedor' as Screen,
      title: 'Fornecedor',
      description: 'Cadastro de fornecedores e parceiros',
      icon: Truck,
      color: 'bg-orange-500 hover:bg-orange-600'
    },
    {
      id: 'aluno' as Screen,
      title: 'Aluno',
      description: 'Cadastro de alunos e estudantes',
      icon: Users,
      color: 'bg-indigo-500 hover:bg-indigo-600'
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Sistema de Cadastros
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Protótipos funcionais desenvolvidos para a segunda etapa do Projeto Integrador. 
          Selecione abaixo a jornada de cadastro que deseja visualizar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cadastros.map((cadastro) => {
          const IconComponent = cadastro.icon;
          return (
            <div
              key={cadastro.id}
              onClick={() => onNavigate(cadastro.id)}
              className="bg-white rounded-xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 border-2 border-gray-100 hover:border-gray-300"
            >
              <div className={`${cadastro.color} w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors`}>
                <IconComponent size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {cadastro.title}
              </h3>
              <p className="text-gray-600">
                {cadastro.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Projeto</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-blue-600 mb-3">Objetivo</h4>
            <p className="text-gray-600">
              Desenvolver protótipos funcionais das telas de interface do sistema, 
              representando formulários para cada jornada de cadastro especificada 
              na primeira etapa do projeto.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-600 mb-3">Funcionalidades</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• Formulários com campos obrigatórios</li>
              <li>• Validação básica de dados</li>
              <li>• Feedback visual de sucesso/erro</li>
              <li>• Interface navegável e intuitiva</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormScreen({ 
  screen, 
  onSubmit, 
  onCancel 
}: { 
  screen: Screen; 
  onSubmit: (type: string) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(getFormTitle(screen));
  };

  const handleCancel = () => {
    setFormData({});
    onCancel();
  };

  const getFormTitle = (screen: Screen) => {
    const titles = {
      'pessoa-fisica': 'Pessoa Física',
      'pessoa-juridica': 'Pessoa Jurídica',
      'professor': 'Professor',
      'fornecedor': 'Fornecedor',
      'aluno': 'Aluno'
    };
    return titles[screen] || '';
  };

  const renderForm = () => {
    switch (screen) {
      case 'pessoa-fisica':
        return <PessoaFisicaForm formData={formData} onChange={handleInputChange} />;
      case 'pessoa-juridica':
        return <PessoaJuridicaForm formData={formData} onChange={handleInputChange} />;
      case 'professor':
        return <ProfessorForm formData={formData} onChange={handleInputChange} />;
      case 'fornecedor':
        return <FornecedorForm formData={formData} onChange={handleInputChange} />;
      case 'aluno':
        return <AlunoForm formData={formData} onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Cadastro de {getFormTitle(screen)}
        </h2>
        <p className="text-gray-600 mb-8">
          Preencha os campos abaixo para realizar o cadastro. Campos marcados com * são obrigatórios.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {renderForm()}

          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Salvar Cadastro
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Componentes de formulário específicos
function PessoaFisicaForm({ formData, onChange }: FormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Nome Completo *"
        type="text"
        value={formData.nome || ''}
        onChange={(value) => onChange('nome', value)}
        placeholder="Digite o nome completo"
      />
      <FormField
        label="CPF *"
        type="text"
        value={formData.cpf || ''}
        onChange={(value) => onChange('cpf', value)}
        placeholder="000.000.000-00"
      />
      <FormField
        label="Data de Nascimento *"
        type="date"
        value={formData.dataNascimento || ''}
        onChange={(value) => onChange('dataNascimento', value)}
      />
      <FormField
        label="Telefone *"
        type="tel"
        value={formData.telefone || ''}
        onChange={(value) => onChange('telefone', value)}
        placeholder="(00) 00000-0000"
      />
      <div className="md:col-span-2">
        <FormField
          label="Email *"
          type="email"
          value={formData.email || ''}
          onChange={(value) => onChange('email', value)}
          placeholder="exemplo@email.com"
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Endereço *"
          type="text"
          value={formData.endereco || ''}
          onChange={(value) => onChange('endereco', value)}
          placeholder="Rua, número, bairro, cidade, estado"
        />
      </div>
    </div>
  );
}

function PessoaJuridicaForm({ formData, onChange }: FormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Razão Social *"
        type="text"
        value={formData.razaoSocial || ''}
        onChange={(value) => onChange('razaoSocial', value)}
        placeholder="Digite a razão social"
      />
      <FormField
        label="Nome Fantasia"
        type="text"
        value={formData.nomeFantasia || ''}
        onChange={(value) => onChange('nomeFantasia', value)}
        placeholder="Digite o nome fantasia"
      />
      <FormField
        label="CNPJ *"
        type="text"
        value={formData.cnpj || ''}
        onChange={(value) => onChange('cnpj', value)}
        placeholder="00.000.000/0000-00"
      />
      <FormField
        label="Inscrição Estadual"
        type="text"
        value={formData.inscricaoEstadual || ''}
        onChange={(value) => onChange('inscricaoEstadual', value)}
        placeholder="Digite a inscrição estadual"
      />
      <FormField
        label="Telefone *"
        type="tel"
        value={formData.telefone || ''}
        onChange={(value) => onChange('telefone', value)}
        placeholder="(00) 0000-0000"
      />
      <FormField
        label="Email *"
        type="email"
        value={formData.email || ''}
        onChange={(value) => onChange('email', value)}
        placeholder="contato@empresa.com"
      />
      <div className="md:col-span-2">
        <FormField
          label="Endereço *"
          type="text"
          value={formData.endereco || ''}
          onChange={(value) => onChange('endereco', value)}
          placeholder="Rua, número, bairro, cidade, estado"
        />
      </div>
    </div>
  );
}

function ProfessorForm({ formData, onChange }: FormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Nome Completo *"
        type="text"
        value={formData.nome || ''}
        onChange={(value) => onChange('nome', value)}
        placeholder="Digite o nome completo"
      />
      <FormField
        label="CPF *"
        type="text"
        value={formData.cpf || ''}
        onChange={(value) => onChange('cpf', value)}
        placeholder="000.000.000-00"
      />
      <FormField
        label="Matrícula *"
        type="text"
        value={formData.matricula || ''}
        onChange={(value) => onChange('matricula', value)}
        placeholder="Digite a matrícula"
      />
      <FormField
        label="Área de Especialização *"
        type="text"
        value={formData.especializacao || ''}
        onChange={(value) => onChange('especializacao', value)}
        placeholder="Ex: Matemática, História, etc."
      />
      <FormField
        label="Telefone *"
        type="tel"
        value={formData.telefone || ''}
        onChange={(value) => onChange('telefone', value)}
        placeholder="(00) 00000-0000"
      />
      <FormField
        label="Email Institucional *"
        type="email"
        value={formData.email || ''}
        onChange={(value) => onChange('email', value)}
        placeholder="professor@instituicao.edu.br"
      />
      <FormField
        label="Titulação *"
        type="select"
        value={formData.titulacao || ''}
        onChange={(value) => onChange('titulacao', value)}
        options={[
          { value: '', label: 'Selecione a titulação' },
          { value: 'graduacao', label: 'Graduação' },
          { value: 'especializacao', label: 'Especialização' },
          { value: 'mestrado', label: 'Mestrado' },
          { value: 'doutorado', label: 'Doutorado' }
        ]}
      />
      <FormField
        label="Regime de Trabalho *"
        type="select"
        value={formData.regime || ''}
        onChange={(value) => onChange('regime', value)}
        options={[
          { value: '', label: 'Selecione o regime' },
          { value: '20h', label: '20 horas' },
          { value: '40h', label: '40 horas' },
          { value: 'de', label: 'Dedicação Exclusiva' }
        ]}
      />
    </div>
  );
}

function FornecedorForm({ formData, onChange }: FormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Razão Social/Nome *"
        type="text"
        value={formData.nome || ''}
        onChange={(value) => onChange('nome', value)}
        placeholder="Digite o nome do fornecedor"
      />
      <FormField
        label="CNPJ/CPF *"
        type="text"
        value={formData.documento || ''}
        onChange={(value) => onChange('documento', value)}
        placeholder="00.000.000/0000-00 ou 000.000.000-00"
      />
      <FormField
        label="Categoria *"
        type="select"
        value={formData.categoria || ''}
        onChange={(value) => onChange('categoria', value)}
        options={[
          { value: '', label: 'Selecione a categoria' },
          { value: 'material-escritorio', label: 'Material de Escritório' },
          { value: 'equipamentos', label: 'Equipamentos' },
          { value: 'servicos', label: 'Serviços' },
          { value: 'alimentacao', label: 'Alimentação' },
          { value: 'limpeza', label: 'Limpeza' }
        ]}
      />
      <FormField
        label="Pessoa de Contato *"
        type="text"
        value={formData.contato || ''}
        onChange={(value) => onChange('contato', value)}
        placeholder="Nome da pessoa responsável"
      />
      <FormField
        label="Telefone *"
        type="tel"
        value={formData.telefone || ''}
        onChange={(value) => onChange('telefone', value)}
        placeholder="(00) 0000-0000"
      />
      <FormField
        label="Email *"
        type="email"
        value={formData.email || ''}
        onChange={(value) => onChange('email', value)}
        placeholder="contato@fornecedor.com"
      />
      <div className="md:col-span-2">
        <FormField
          label="Endereço *"
          type="text"
          value={formData.endereco || ''}
          onChange={(value) => onChange('endereco', value)}
          placeholder="Rua, número, bairro, cidade, estado"
        />
      </div>
      <div className="md:col-span-2">
        <FormField
          label="Observações"
          type="textarea"
          value={formData.observacoes || ''}
          onChange={(value) => onChange('observacoes', value)}
          placeholder="Informações adicionais sobre o fornecedor"
        />
      </div>
    </div>
  );
}

function AlunoForm({ formData, onChange }: FormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        label="Nome Completo *"
        type="text"
        value={formData.nome || ''}
        onChange={(value) => onChange('nome', value)}
        placeholder="Digite o nome completo"
      />
      <FormField
        label="CPF *"
        type="text"
        value={formData.cpf || ''}
        onChange={(value) => onChange('cpf', value)}
        placeholder="000.000.000-00"
      />
      <FormField
        label="Data de Nascimento *"
        type="date"
        value={formData.dataNascimento || ''}
        onChange={(value) => onChange('dataNascimento', value)}
      />
      <FormField
        label="Matrícula *"
        type="text"
        value={formData.matricula || ''}
        onChange={(value) => onChange('matricula', value)}
        placeholder="Digite a matrícula"
      />
      <FormField
        label="Curso *"
        type="select"
        value={formData.curso || ''}
        onChange={(value) => onChange('curso', value)}
        options={[
          { value: '', label: 'Selecione o curso' },
          { value: 'ads', label: 'Análise e Desenvolvimento de Sistemas' },
          { value: 'redes', label: 'Redes de Computadores' },
          { value: 'gestao-ti', label: 'Gestão da TI' },
          { value: 'jogos', label: 'Jogos Digitais' }
        ]}
      />
      <FormField
        label="Período *"
        type="select"
        value={formData.periodo || ''}
        onChange={(value) => onChange('periodo', value)}
        options={[
          { value: '', label: 'Selecione o período' },
          { value: 'matutino', label: 'Matutino' },
          { value: 'vespertino', label: 'Vespertino' },
          { value: 'noturno', label: 'Noturno' }
        ]}
      />
      <FormField
        label="Telefone *"
        type="tel"
        value={formData.telefone || ''}
        onChange={(value) => onChange('telefone', value)}
        placeholder="(00) 00000-0000"
      />
      <FormField
        label="Email Institucional *"
        type="email"
        value={formData.email || ''}
        onChange={(value) => onChange('email', value)}
        placeholder="aluno@instituicao.edu.br"
      />
      <div className="md:col-span-2">
        <FormField
          label="Nome do Responsável"
          type="text"
          value={formData.responsavel || ''}
          onChange={(value) => onChange('responsavel', value)}
          placeholder="Nome do responsável (se menor de idade)"
        />
      </div>
    </div>
  );
}

// Tipos e componentes auxiliares
interface FormProps {
  formData: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

function FormField({ label, type, value, onChange, placeholder, options }: FormFieldProps) {
  const baseClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors";

  if (type === 'select') {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={baseClasses}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={baseClasses}
      />
    </div>
  );
}

export default App;