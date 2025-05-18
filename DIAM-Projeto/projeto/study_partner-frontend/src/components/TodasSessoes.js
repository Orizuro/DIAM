import React, { useEffect, useState } from 'react';
import './TodasSessoes.css';
import UcCard from './UsCard';
import { GET_UCS_URL } from '../Constants';
import axios from 'axios';

const TodasSessoes = () => {
    const [ucs, setUcs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get(GET_UCS_URL, {withCredentials: true})
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
                    <UcCard key={uc.code} name={uc.name} description={uc.description} code={uc.code} />
                ))}
            </div>
        </div>
    );
};

export default TodasSessoes;
