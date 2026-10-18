import { AnimatePresence, motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';

// Front-end only: shows a confirmation and sends nothing.
export function SignupForm({ cta = 'Sign up', note }: { cta?: string; note?: string }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="signup">
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.p
            key="done"
            className="signup__done"
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            You’re on the list, {email}. Demo only, so nothing was sent.
          </motion.p>
        ) : (
          <motion.form key="form" onSubmit={submit} exit={{ opacity: 0, y: -8 }} className="signup__form">
            <label className="visually-hidden" htmlFor="signup-email">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn--cream" type="submit">
              {cta}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {note && !done && <p className="signup__note">{note}</p>}
    </div>
  );
}
