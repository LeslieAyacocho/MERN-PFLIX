import {useEffect, useState, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import {fetchProducerDetails,clearErrors} from '../../../redux/actions/producerActions';
import { useDispatch, useSelector } from 'react-redux';


const ProducerDetails = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldImages, setOldImages] = useState([]);

    //useDispatch
    const dispatch = useDispatch();
    
    const {error, producer, loading } = useSelector(state => state.producerDetails)
    
    let { producerId }  = useParams();

    useEffect(() => {
        if (producer && producer._id !== producerId) {
            dispatch(fetchProducerDetails(producerId));
        } else {
            setName(producer.name);
            setEmail(producer.email);
            setOldImages(producer.images)
        }

        if (error) {
            // alert.error(error);
            dispatch(clearErrors())
        }

        

        return() => {
            // dispatch(removeSelectedProducer());
        }
    },  [producerId, dispatch, error, producer]);
    return ( 
        <Fragment>
                <div className=" content content-wrapper">
            {loading === 0 ? (
                <div> ... Loading</div> 
            ) : ( 
                <div>
                {oldImages && oldImages.map(img => (
                                            <img key={img} src={img.url} alt={img.url} className="w-300" />
                                        ))}
                {/* <img src={images} className='w-300' /> */}
                <h1>{name}</h1>
                <p>{email}</p>
                </div>
                
            )} 
        </div> 
        </Fragment>
    
    );
}

export default ProducerDetails;