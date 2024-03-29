import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import asanaService from '../../api/asanaService';
import { AuthContext } from '../../context/AuthContext';
import './footer.scss';

export default function Footer() {
  const { loggedIn, user, signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    testApiCalls();

    return () => {};
  }, [loggedIn]);

  const testApiCalls = async () => {
    if (loggedIn) {
      try {
        // asanaService.getDefaultAsanas().then((data) => {
        //   console.log("getDefaultAsanas", data);
        // });
        // asanaService.getRandomAsanas(3).then((data) => {
        //   console.log("getRandomAsanas", data);
        // });
        // asanaService.getUserAsanas(user.id).then((data) => {
        //   console.log("getUserAsanas", data);
        // });
        // asanaService.getAsana("6267e2774dc8720798465c55").then((data) => {
        //   console.log("getAsana", data);
        // });
        // asanaService.getUserSequences(user.id).then((data) => {
        //   console.log("getUserSequences", data);
        // });
        // asanaService.getSequence("626937084fff0adc4c4b8d82").then((data) => {
        //   console.log("getSequence", data);
        // });
        // asanaService.getUserClasses(user.id, true).then((data) => {
        //   console.log("getUserClasses", data);
        // });
        // asanaService.getClass("626937304fff0adc4c4b8d85").then((data) => {
        //   console.log("getClass", data);
        // });
        // Example for: create a Yoga-Class
        // testCreateClass().catch((error) => setError(error.message));
        // testSaveClass().catch((error) => setError(error.message));
        // Example for: create a Yoga-Sequence
        // testCreateSequence().catch((error) => setError(error.message));
        // testSaveSequence().catch((error) => setError(error.message));
        // Example for: create a Yoga-Asana
        // testCreateAsana().catch((error) => setError(error.message));
        // testSaveAsana().catch((error) => setError(error.message));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  /**
   * Example for: create a Yoga-Class
   */
  async function testCreateClass() {
    const lydiaUserId = '62601f220295d1ebcf9e0599'; // -> Lydia user-id

    asanaService.getUserClasses(lydiaUserId, true).then((data) => {
      console.log('lydiaUserId >> getUserClasses', data);
    });
    asanaService.getUserClasses(lydiaUserId, false).then((data) => {
      console.log('lydiaUserId >> getUserClasses', data);
    });

    const createClass = async () => {
      const asanas = await asanaService.getRandomAsanas(5);
      const asanas2 = await asanaService.getRandomAsanas(5);

      const nr = 4;

      const classObj = {
        title: `Lydias ${nr}nd Class`,
        user: lydiaUserId,
        plan: [
          {
            user: lydiaUserId,
            type: 'sequence',
            duration: 4,
            description: `Lydia's ${nr}nd class text to sequence no.1`,
            title: `Lydia's ${nr}nd class sequence no.1`,
            asanas: asanas
          },
          {
            user: lydiaUserId,
            type: 'sequence 2',
            duration: 4,
            description: `Lydia's ${nr}nd class text to sequence no. 2`,
            title: `Lydia's ${nr}nd class sequence no. 2`,
            asanas: asanas2
          }
        ],
        favourite: true
      };

      return classObj;
    };

    const classObj = await createClass();

    const result = await asanaService.createClass(classObj);
    console.log('createClass', result);
  }

  /**
   * Example for: create a Yoga-Sequence
   */
  async function testSaveClass() {
    const classId = '626937304fff0adc4c4b8d85'; //
    // const userId = lydiaUserId;
    const userId = user.id;

    const classObj = await asanaService.getClass(classId);
    classObj.title = 'Class of the year';
    classObj.duration = 87;

    const result = await asanaService.saveClass(classObj);
    console.log('📒 saveClass', result);
  }

  /**
   * Example for: create a Yoga-Sequence
   */
  async function testCreateSequence() {
    const lydiaUserId = '62601f220295d1ebcf9e0599'; // -> Lydia user-id
    // const userId = lydiaUserId;
    const userId = user.id;

    // asanaService.getUserClasses(lydiaUserId, true).then((data) => {
    //   console.log("lydiaUserId >> getUserClasses", data);
    // });
    // asanaService.getUserClasses(lydiaUserId, false).then((data) => {
    //   console.log("lydiaUserId >> getUserClasses", data);
    // });

    const createSequence = async () => {
      const asanas = await asanaService.getRandomAsanas(5);

      const nr = 5;

      const seqObj = {
        user: userId,
        type: 'sequence',
        duration: 4,
        // description: `${user.username}'s ${nr}nd sequence`,
        title: `${user.name}'s ${nr}nd sequence1`,
        asanas: asanas
      };

      return seqObj;
    };

    const seqObj = await createSequence();

    const result = await asanaService.createSequence(seqObj);
    console.log('📒 createSequence', result);
  }

  /**
   * Example for: create a Yoga-Sequence
   */
  async function testSaveSequence() {
    const sequenceId = '626bef304ec2a3ded872a630'; //
    // const userId = lydiaUserId;
    const userId = user.id;

    const sequenceObj = await asanaService.getSequence(sequenceId);
    sequenceObj.title = 'Sequence of the year';
    sequenceObj.duration = 8;

    const result = await asanaService.saveSequence(sequenceObj);
    console.log('📒 saveSequence', result);
  }

  /**
   * Example for: create a Yoga-Sequence
   */
  async function testCreateAsana() {
    const lydiaUserId = '62601f220295d1ebcf9e0599'; // -> Lydia user-id
    // const userId = lydiaUserId;
    const userId = user.id;

    // asanaService.getUserClasses(lydiaUserId, true).then((data) => {
    //   console.log("lydiaUserId >> getUserClasses", data);
    // });
    // asanaService.getUserClasses(lydiaUserId, false).then((data) => {
    //   console.log("lydiaUserId >> getUserClasses", data);
    // });

    const createAsana = async () => {
      const asanas = await asanaService.getRandomAsanas(5);

      const nr = 5;

      const asanaObj = {
        user: userId,
        img_url: 'https://www.dropbox.com/s/px1foombb3v24se/dolphin.svg?raw=1',
        asana: {
          sanskrit: 'My own Asana',
          name: 'Custom Asana'
        },
        level: 'advanced beginners',
        tags: ['arm balances', 'abdominals', 'back', 'inversion']
      };

      return asanaObj;
    };

    const asanaObj = await createAsana();

    const result = await asanaService.createAsana(asanaObj);
    console.log('📒 createAsana', result);
  }

  /**
   * Example for: create a Yoga-Sequence
   */
  async function testSaveAsana() {
    const asanaId = '626bf4a8ed4cf0ae52daf7bd'; //
    // const userId = lydiaUserId;
    const userId = user.id;

    const asanaObj = await asanaService.getAsana(asanaId);
    asanaObj.asana.sanskrit = 'Haukasana';
    asanaObj.asana.name = 'The Haukman';

    const result = await asanaService.saveAsana(asanaObj);
    console.log('📒 saveAsana', result);
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError('');

    const result = await signup({
      email: name,
      username: name.split('@')[0],
      password: password,
      validated: true
    });

    if (!result) {
      setError('Invalid username or password!');
    } else {
      setName('');
      setPassword('');
      navigate(`/user/dashboard`);
    }
  }

  const imgEl = useRef();

  function exportImgNew() {
    const exampleMongoDBClassId = '5e9f8f8f8f8f8f8f8f8f8f8';
    asanaService
      .createClassPreview(imgEl.current, exampleMongoDBClassId)
      .catch((err) => {
        console.log('err:', err);
      });
  }

  return (
    <div className=" w-full h-56 relative flex items-center justify-center ">
      <footer className="footer w-full absolute bottom-0 py-10 flex flex-col items-center justify-center ">
        <div className="flex mt-4 space-x-4 sm:justify-center sm:m-0">
          <a
            href="#"
            className="icon text-gray-700 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="iconH w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="icon text-gray-700 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="iconH w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="icon text-gray-700 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="iconH w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="#"
            className="icon text-gray-700 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="iconH w-8 h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-col md:flex-row items-center copyright text-sm text-gray-500 text-center mt-1">
          <p className="mx-2">© 2022</p>
          <p className="mx-2">
            Copyright: Monkey Plan Lydia, Vita, Michael, Thomas.{' '}
          </p>
          <p className="mx-2">All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
