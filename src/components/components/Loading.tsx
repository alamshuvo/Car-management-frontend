import loading from '../../../public/spinner-8565_256.gif'

const Loading = () => {
    return (
        <div className='h-[100vh] flex justify-center items-center '>
            <img src={loading} alt="" />
        </div>
    );
};

export default Loading;