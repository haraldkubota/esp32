#include <stdio.h>
#include <stdlib.h>
#include <termios.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>


static struct termios oldterminfo;


void closeserial(int fd)
{
    tcsetattr(fd, TCSANOW, &oldterminfo);
    if (close(fd) < 0)
        perror("closeserial()");
}


int openserial(char *devicename)
{
    int fd;
    struct termios attr;

    if ((fd = open(devicename, O_RDWR)) == -1) {
        perror("openserial(): open()");
        return 0;
    }
    if (tcgetattr(fd, &oldterminfo) == -1) {
        perror("openserial(): tcgetattr()");
        return 0;
    }
    attr = oldterminfo;
    attr.c_cflag |= CRTSCTS | CLOCAL;
    attr.c_oflag = 0;
    if (tcflush(fd, TCIOFLUSH) == -1) {
        perror("openserial(): tcflush()");
        return 0;
    }
    if (tcsetattr(fd, TCSANOW, &attr) == -1) {
        perror("initserial(): tcsetattr()");
        return 0;
    }
    return fd;
}


int setSerial(int fd, int bitmask, int level)
{
    int status;

    if (ioctl(fd, TIOCMGET, &status) == -1) {
        perror("setSerial(): TIOCMGET");
        return 0;
    }
    if (level)
        status |= bitmask;
    else
        status &= ~bitmask;
    if (ioctl(fd, TIOCMSET, &status) == -1) {
        perror("setSerial(): TIOCMSET");
        return 0;
    }
    return 1;
}


int main(int argc, char *argv[])
{
    int fd;
    char *serialdev = "/dev/ttyUSB0";
    int bitmask;

    if (argc == 2) {
        serialdev = argv[1];
    }

    // printf("device: %s\n", serialdev);


    fd = openserial(serialdev);
    if (!fd) {
        fprintf(stderr, "Error while initializing %s.\n", serialdev);
        return 1;
    }

    bitmask = TIOCM_DTR;    // TIOCM_RTS | TIOCM_DTR

    setSerial(fd, bitmask, 0);
    sleep(1);       /* pause 1 second */
    setSerial(fd, bitmask, 1);

    closeserial(fd);
    return 0;
}
