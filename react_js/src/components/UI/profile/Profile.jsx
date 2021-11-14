import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import MyButton from "../button/MyButton";
import Modal from "../Modal/Modal";
import classes from './Profile.module.css';

const Profile = () => {
  const [modalAvtive, setModalActive] = useState(false);

  return (
    <div>
      <div className={classes.wrap}>
        <div style={{ width: 300, height: 300 }}>
          <Avatar />
        </div>
        <div className={classes.info}>
          <div className={classes.infoName}>
            Разработчик: Кирилл Лавров
          </div>
          <MyButton onClick={() => setModalActive(true)}>Подробнее...</MyButton>
        </div>
      </div>
      <Modal active={modalAvtive} setActive={setModalActive}>
        <div className={classes.wrapModal} style={{ marginTop: 0 }}>
          <div style={{ width: 200, height: 200 }}>
            <Avatar />
          </div>
          <div className={classes.info}>
            <div className={classes.infoName}>
              Разработчик: Кирилл Лавров
            </div>
            <div className={classes.infoName}>
              Возраст: 39 лет
            </div>
            <div className={classes.infoName}>
              Город: Томск
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;