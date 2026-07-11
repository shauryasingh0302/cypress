import React from 'react'

type Props = {
    title: string;
    subheading?:string;
    pill: string;
}

const TitleSection: React.FC<Props> = ({title, subheading, pill}) => {
  return (
    <React.Fragment>
        <section className='flex flex-col gap-4 justify-center items-start md:items-center'>
            <article className='rounded-full p-px text-sm bg-linear-to-r from-primary to-brand-primary-blue dark:from-brand-primary-blue dark:to-brand-primary-purple'>
                <div className="rounded-full px-3 py-1 bg-background dark:bg-black">
                    {pill}
                </div>
            </article>
            {subheading?(
                <>
                <h2 className='text-left text-3xl sm:text-5xl sm:max-w-187.5 md:text-center font-semibold'>
                    {title}
                </h2>
                <p className='dark:text-washed-purple-700 sm:max-w-112.5 md:text-center'>{subheading}</p>
                </>
            ):(
                <h1 className='text-left text-4xl sm:text-6xl sm:max-w-212.5 md:text-center font-semibold'>{title}</h1>
            )}
        </section>
    </React.Fragment>
  )
}

export default TitleSection