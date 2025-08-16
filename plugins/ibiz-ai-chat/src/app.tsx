import './app.scss';
import { chat } from './controller';
import { createUUID } from './utils';

export function App() {
  const onClick = () => {
    const ai = chat.create({
      async question(question): Promise<boolean> {
        const id = createUUID();
        return new Promise(resolve => {
          setTimeout(() => {
            ai.addMessage({
              messageid: id,
              state: 20,
              role: 'ASSISTANT',
              content: '# 标题',
              type: 'DEFAULT',
            });

            setTimeout(() => {
              ai.addMessage({
                messageid: id,
                state: 20,
                role: 'ASSISTANT',
                content: '\n\n# 标题2',
                type: 'DEFAULT',
              });

              setTimeout(() => {
                ai.addMessage({
                  messageid: id,
                  state: 20,
                  role: 'ASSISTANT',
                  content: '\n\n# 标题3',
                  type: 'DEFAULT',
                });

                setTimeout(() => {
                  ai.addMessage({
                    messageid: id,
                    state: 20,
                    role: 'ASSISTANT',
                    content: '\n\n# 标题4',
                    type: 'DEFAULT',
                  });

                  setTimeout(() => {
                    ai.addMessage({
                      messageid: id,
                      state: 20,
                      role: 'ASSISTANT',
                      content: '\n\n# markdown',
                      type: 'DEFAULT',
                    });
                    resolve(true);
                  }, 500);
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        });
      },
    });
  };

  return (
    <>
      <button onClick={onClick}>打开</button>
    </>
  );
}
