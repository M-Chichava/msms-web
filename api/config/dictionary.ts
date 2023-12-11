const translateLabel = (labelKey) => {

    const translations = {
        microcredit: "Painel Principal",
        loans: "Empréstimos",
        customers: "Clientes",
        add: "Adicionar Novo",
        payments: "Pagamentos"
    };


    return translations[labelKey] || "Detalhes";
};

export default translateLabel