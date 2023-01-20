import {Injectable, Injector} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import {AreYouSureComponent} from 'src/app/components/shared/are-you-sure/are-you-sure.component';

@Injectable()
export class UIComponentsService {

  constructor(private snack: MatSnackBar, private injector: Injector) {}

  /**
   * Imprime un dialog modal para advertirle al usuario de una operación
   *
   * @param title Título del modal
   * @param message Mensaje que se mostrará en el cuerpo, puede contener inyecciones de html que sirvan dentro de <p>
   * @param confirmMessage Mensaje de confirmación del botón
   * @param width ajusta el ancho del dialogo
   */
  showDialogNotification(title: string, message: string, confirmMessage?: string, width?: string) {
    const dialog = this.injector.get(MatDialog);
    return dialog.open(AreYouSureComponent, {
      data: {title, message, confirm_message: confirmMessage},
      width: width || '400px'
    });
  }

  /**
   * @desc Muestra un snack
   *
   * @returns Observable<void>
   * nos podemos suscribir a este observable si necesitamos
   * obtener el evento cuando se cerró el snack
   *
   * @author Armando Perdomo
   */
  async showSnackNotification(conf: SnackBarConfiguration) {
    const duration = conf.delayTime || 4000;
    const action = conf.customDismiss || null;
    const horizontalPosition: MatSnackBarHorizontalPosition = conf.xPosition || 'center';
    const verticalPosition: MatSnackBarVerticalPosition = conf.yPosition || 'top';

    const message = conf.customMsg || '';

    return this.snack.open(message, action || 'OK', {
      duration,
      horizontalPosition,
      verticalPosition,
      panelClass: conf.panelClass
    }).onAction();
  }

  /**
   * Imprime un mensaje genérico de error
   * @param conf
   */
  async someWeirdHappened(conf: SnackBarConfiguration) {
    console.error(conf.error);
    if(!conf.messageId) conf.messageId = 'ERRORS.UNEXPECTED';
    return this.showSnackNotification(conf);
  }

  /**
   * Imprime un mensaje genérico de error
   * @param conf
   */
  async internalError(conf: SnackBarConfiguration) {
    console.error(conf.error);
    conf.panelClass = 'bg-danger';
    if(!conf.messageId) conf.messageId = 'ERRORS.INTERNAL';
    return this.showSnackNotification(conf);
  }
}

/**
 * @param messageId El id del mensaje que se buscará en la tranducción
 * @param messageParams Parámetros que se pueden insertar
 * @param undoMsg mensaje que saldrá en la visual del botón para cerrar si no se define no saldrá el botón
 * @param panelClass clases que se pueden agregar al snack
 * @param error si es un error agregar este objeto
 * @param delayTime tiempo de expiración del modal por defecto tiene 2seg
 * @param xPosition posición horizontal del snackbar
 * @param yPosition posición vertical de snackbar
 */
export interface SnackBarConfiguration{
  messageId?: string;
  messageParams?: {[key: string]: string;};
  error?: any;
  customDismiss?: string;
  customMsg?: string;
  panelClass?: string | string[],
  delayTime?: number,
  xPosition?: MatSnackBarHorizontalPosition,
  yPosition?: MatSnackBarVerticalPosition
}
