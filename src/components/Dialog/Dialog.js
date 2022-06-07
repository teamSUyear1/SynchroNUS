import React from 'react'
import classes from "./Dialog.module.css"

function Dialog({show}) {
    if(!show) {
        return <></>
    }
  return (
    <>
  <div className={classes.overlay}>


    <div className={classes.dialog}>

      <div className={classes.dialog__content}>
        <h2 className={classes.dialog__title}>Delete a task?</h2>
        <p className={classes.dialog__description}>Are you sure you want to delete this task?</p>
      </div>

      <hr />

      <div className={classes.dialog__footer}>
        <button className={classes.dialog__cancel}>Cancel</button>
        <button className={classes.dialog__confirm}>Yes, delete it</button>
      </div>

    </div>

  </div>
    </>
  )
}

export default Dialog