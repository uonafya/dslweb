import Link from 'next/link';

const Loading = ({showImage, isBig}) => (
    <div className={isBig?'m-b-20 div p-10 is-gray is-light br-3 bw-1 bdcclear text-center':'container p-0 text-center'}>
        <img src="/static/images/ripple-loading.svg" width="60px" className={showImage==true?'':'hidden'}/> 
        
        <img src="/static/images/ripple-loading.svg" width='25px' className={isBig==true?'hidden':''}/> 
        <h2 className="m-b-10 text-grey">
            Loading
        </h2>
        
    </div>
);

export default Loading;
