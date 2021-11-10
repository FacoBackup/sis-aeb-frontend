import getQuery from "../utils/getQuery";

const QUERIES = {
    action: {...getQuery('action'), ...{keys: [{key: 'number', type: 'string', label: 'Número', visible: true}]}},
    type: {...getQuery('type'), ...{keys: [{key: 'type', type: 'string', label: 'Tipo', visible: true}]}},
    classification: {...getQuery('classification'), ...{keys: [{key: 'description', type: 'string', label: 'Classificação', visible: true}]}},
    infrastructure: {...getQuery('infrastructure'), ...{keys: [{key: 'name', type: 'string', label: 'Nome', visible: true}]}},
    unit: {...getQuery('unit'), ...{keys: [  {key: 'acronym', type: 'string', label: 'Acrônomo', visible: true}]}},
}

const KEYS = {
    projectTed: [
        {
            key: 'activity_project',
            type: 'object',
            label: 'Projeto / atividade',
            subfieldKey: 'name',
            subType: 'string',

            visible: true
        },
        {
            key: 'ted',
            type: 'object',
            label: 'Instrumento de celebração',
            subfieldKey: 'number',
            subType: 'string',

            visible: true
        }
    ],

    action: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'number', type: 'string', label: 'Número', visible: true},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true}
    ],
    budgetPlan: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {
            key: 'action',
            type: 'object',
            label: 'Ação',
            visible: true,
            subfieldKey: 'number',
            subType: 'string',
            query: QUERIES?.action
        },
        {key: 'number', type: 'string', label: 'Número', visible: true},
        {key: 'detailing', type: 'string', label: 'Detalhamento', visible: true}
    ],
    classification: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'description', type: 'string', label: 'Classificação', visible: true},
        {
            key: 'classification_type',
            type: 'object',
            label: 'Tipo',
            visible: true,
            subfieldKey: 'type',
            subType: 'string',
            query:QUERIES?.type
        }
    ],
    components: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'situation', type: 'string', label: 'Situação', visible: true},
        {
            key: 'classification',
            type: 'object',
            label: 'Classificação',
            visible: true,
            subfieldKey: 'classification',
            subType: 'string',
            query: QUERIES?.classification
        },
        {
            key: 'infrastructure',
            type: 'object',
            label: 'Infraestrutura',
            visible: true,
            subfieldKey: 'name',
            subType: 'string',
            query: QUERIES?.infrastructure
        }
    ],
    decentralizedUnit: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'name', type: 'string', label: 'Nome', visible: true},
        {key: 'competent_authority', type: 'string', label: 'Autoridade competente', visible: true},
        {key: 'cpf', type: 'string', label: 'CPF', visible: true},
        {key: 'identification', type: 'string', label: 'Identificação', visible: true},
        {key: 'ugi', type: 'string', label: 'UGI', visible: true},
        {key: 'uge', type: 'string', label: 'UGE', visible: true},
        {key: 'cnpj', type: 'string', label: 'CNPJ', visible: true},
        {key: 'ug', type: 'string', label: 'UG', visible: true},
        {
            key: 'responsible',
            type: 'object',
            label: 'Unidade da AEB responsável',
            visible: true,
            subfieldKey: 'acronym',
            subType: 'string',
            query: QUERIES?.unit
        }
    ],
    infrastructure: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'name', type: 'string', label: 'Nome', visible: true},
        {key: 'type', label: 'Tipo', visible: true, type: 'string'}
    ],
    natureOfExpense: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'gnd', type: 'string', label: 'GND', visible: true},
        {key: 'nature_of_expense', type: 'string', label: 'Natureza de despesa', visible: true},
        {key: 'description', type: 'string', label: 'Descrição', visible: true}
    ],
    type: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'type', type: 'string', label: 'Tipo', visible: true}
    ],
    responsible: [
        {key: 'id', type: 'number', label: 'ID', visible: false},
        {key: 'acronym', type: 'string', label: 'Acrônomo', visible: true},
        {key: 'name', type: 'string', label: 'Nome', visible: true}
    ],
}


export default KEYS