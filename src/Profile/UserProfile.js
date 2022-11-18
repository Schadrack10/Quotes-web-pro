import ProfileForm from './ProfileForm';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  return (
    <section className={classes.profile}>
        <div style={{borderRadius:'100%', height:'300px',width:'300px'}}>

        </div>
      <h1>Your User Profile</h1>

      <ProfileForm />
    </section>
  );
};

export default UserProfile;
