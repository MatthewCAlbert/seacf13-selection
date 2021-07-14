import { useContext, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import { fetch } from '../../utils/fetch';
import Input from './Input';
import { AuthContext } from '../../stores/authContext';
import moment from 'moment';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '70%',
    maxWidth: '750px'
  },
};

const AppointmentAddModal = ({modalIsOpen, refresh, setIsOpen=(x)=>{}}) => {
  const {user} = useContext(AuthContext);
  const [formData, setFormData] = useState({
    doctorName: "",
    description: "",
    maxRegistrant: 0,
    date: new Date()
  });
  const [submitted, setSubmitted] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    setFormData({
      doctorName: "",
      description: "",
      maxRegistrant: 0,
      date: new Date()
    });
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onSubmitAppointment(){
    setSubmitted(true);
    
    try{
      const res = await fetch(user.token).post("/appointment-create", {
        ...formData, date: moment(formData.date).format("YYYY-MM-DD HH:mm:ss")
      });
      if( res && res.data && res.data.success ){
        closeModal();
      }
    }catch(e){
      setSubmitted(false);
    }
    refresh();
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Add Appointment"
      ariaHideApp={false}
    >
      <button className="btn btn-red" onClick={closeModal}><i className="fas fa-times"></i></button>
      <div>
        <div className="form px-10 py-7 w-full">
          <h1 className="font-bold text-2xl mb-4">Add Appointment Form</h1>
          <Input form={formData} setForm={setFormData} title="Doctor Name" type="text" name="doctorName"/>
          <Input form={formData} setForm={setFormData} title="Description" type="text" name="description"/>
          <Input form={formData} setForm={setFormData} title="Max Registrant" type="number" name="maxRegistrant" min="0"/>
          <Input form={formData} setForm={setFormData} title="Date Time" name="date">
            <DateTimePicker
              onChange={(e)=>setFormData({...formData, date:e})}
              value={formData.date}
            />
          </Input>
          <br />
          <button className="btn btn-blue mt-5" onClick={onSubmitAppointment} disabled={submitted}>Submit</button>
        </div>
      </div>
    </Modal>
  )
}

export default AppointmentAddModal
