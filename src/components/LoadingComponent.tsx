import { Oval } from 'react-loader-spinner';

export function LoadingComponent() {
  return (
    <div className='flex h-96 items-center justify-center'>
      <Oval
        visible={true}
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}