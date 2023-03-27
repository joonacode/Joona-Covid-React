import './image-header.css';
import {
  DoctorImage,
  Virus1,
  Virus2,
  Virus3,
  Virus4,
  Virus5,
  Virus6,
  Virus7,
} from '@/assets';

function ImageHeader() {
  return (
    <div className="position-relative">
      <img
        src={DoctorImage}
        alt="imageCorona"
        className="img-fluid w-100 h-auto img-doctor"
      />
      <img
        src={Virus1}
        alt="imageCorona"
        className="img-fluid cursor-pointer img-virus virus1 animate-virus1"
      />

      <img
        src={Virus2}
        alt="imageCorona"
        className="img-fluid img-virus virus2 animate-virus2"
      />
      <img
        src={Virus3}
        alt="imageCorona"
        className="img-fluid img-virus virus3 animate-virus3 "
      />
      <img
        src={Virus4}
        alt="imageCorona"
        className="img-fluid img-virus virus4 animate-virus4 "
      />
      <img
        src={Virus5}
        alt="imageCorona"
        className="img-fluid img-virus virus5 animate-virus5 "
      />
      <img
        src={Virus6}
        alt="imageCorona"
        className="img-fluid img-virus virus6 animate-virus6 "
      />
      <img
        src={Virus7}
        alt="imageCorona"
        className="img-fluid img-virus virus7 animate-virus7 "
      />
    </div>
  );
}

export default ImageHeader;
