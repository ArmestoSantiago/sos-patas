import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';

export function Chat() {
  return (
    <>
      <Header title="Chat" />

      <div className='mx-auto max-w-160 w-full pb-20 my-6 px-4 text-center'>
        <p>Chat Próximamente...</p>
        <h3 className='text-main text-2xl pt-6'>Sobre SOSPatas</h3>
        <div className='space-y-4 pt-4 md:text-xl text-stone-700'>
          <p>
            SOSPatas es un espacio para ayudar a animales que lo necesitan.
            Permite compartir casos de mascotas perdidas, en adopción o en
            situación de rescate, para que más personas puedan verlas y dar una mano.
          </p>

          <p>
            El objetivo es simple: hacer visible lo que muchas veces pasa desapercibido.
            Cada publicación puede ser una oportunidad para que un animal encuentre un hogar,
            reciba atención o vuelva con su familia.
          </p>

          <p>
            Detrás de cada caso hay una historia, y muchas veces alguien dispuesto a ayudar,
            pero que nunca llega a enterarse. SOSPatas busca acercar esas dos partes.
          </p>

          <p>
            La idea es construir una red donde cualquiera pueda colaborar,
            ya sea difundiendo, adoptando o avisando sobre un animal en situación vulnerable.
            Porque incluso el gesto más pequeño puede hacer una gran diferencia.
          </p>
        </div>
      </div>

      <NavMenu />
    </>
  );
};