import i18n from 'i18next'; 
import {Planeacion} from './1_Planeacion';
import TomaDePedido from './2_TomaDePedido';
import {Otros} from './3_Otros';
import {FinalizarPedido} from './4_FinalizarPedido';

const controlador:any=[
    {
        id:'planeacion',
        titulo: i18n.t('pasos.planeacion'),
        componente:<Planeacion/>
    },
    {
        id:'tomaDePedido',
        titulo: i18n.t('pasos.tomaDePedido'),
        componente:<TomaDePedido/>
    },
    {
        id:'otros',
        titulo: i18n.t('pasos.otros'),
        componente:<Otros/>
    },
    {
        id:'finalizar',
        titulo: i18n.t('pasos.finalizar'),
        componente:<FinalizarPedido/>
    },
];

export default controlador;