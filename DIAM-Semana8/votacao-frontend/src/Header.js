function Header() {
    return (
        <>
            <div className="text-center">
                <img
                    src="/iscte.png" // (1)
                    width="600"
                    alt="ISCTE"
                    className="img-thumbnail"
                    style={{marginTop: "20px"}} // (2)
                />
                <h2>Submissão Semana 8</h2>
                <h3>Integração de Django com React</h3>
            </div>
        </>
    );
}

export default Header;