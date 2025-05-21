import React, { useEffect, useState } from 'react';
import './styles/TodasSessoes.css';
import UcCard from './UsCard';
import { DELETE_UC_URL, deleteFactory, EDIT_UC_URL, GET_UCS_URL } from '../Constants';
import axios from 'axios';
import AddUcCard from './AddUcCard';
import AddUcForm from './AddUcForm';
import { useAuth } from '../hooks/AuthProvider';
import EditUcForm from './EditUcForm';

const TodasSessoes = () => {
    const user = useAuth().currentUser ?? false;

    const [showModal, setShowModal] = useState(false);
    const [ucs, setUcs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUc, setSelectedUc] = useState(null);

    useEffect(() => {
        axios.get(GET_UCS_URL)
            .then(res => res.data)
            .then((data) => setUcs(data.ucs))
            .catch((err) => console.error('Erro ao buscar UCs:', err));
    }, []);

    const filteredUcs = ucs.filter((uc) =>
        uc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uc.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="todas-sessoes-wrapper">
            <p className="intro-text">
                Explore todas as sessões de estudo disponíveis. Utilize a barra de pesquisa para encontrar unidades curriculares específicas.
            </p>

            <input
                type="text"
                placeholder="Pesquisar por nome ou código da UC"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
            />

            <div className="uc-grid">
                {filteredUcs.map((uc) => (
                    <UcCard 
                        key={uc.code} 
                        name={uc.name} 
                        description={uc.description} 
                        code={uc.code} 
                        onEdit={() => setSelectedUc({id: uc.code, name: uc.name, description: uc.description})}
                        onDelete={ 
                            () => deleteFactory(DELETE_UC_URL, uc.code)
                        }
                    />
                ))}

                { 
                    user.isAdmin && <AddUcCard onClick={() => setShowModal(true)} /> 
                }

                {
                    showModal && <AddUcForm onClose={() => setShowModal(false)} onSubmit={(e) => console.log(e)} />
                }

                {
                    selectedUc && 
                    <EditUcForm 
                        ucId={selectedUc.id}
                        ucName={selectedUc.name}
                        ucDescription={selectedUc.description}
                        onClose={() => setSelectedUc(null)} 
                        onSubmit={() => window.location.reload()} 
                    />
                }
            </div>
        </div>
    );
};

export default TodasSessoes;
