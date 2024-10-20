export default function Inicio(){


    const perfil={
        id:1,
        name:"lucas",
        auth:false
    }


    if(perfil.auth){
        return(
            <main style={{minHeight:'80vh'}}>
                <div>
                    <h1 style={{margin:0}}>AUTHENTICADO</h1>
                </div>
            </main>
        )
    }
    return(
        <main style={{minHeight:'80vh'}}>
            <div>
                <h1 style={{margin:0}}>Inicio</h1>
            </div>
        </main>
    )
}