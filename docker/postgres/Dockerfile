FROM postgres:16.3-alpine3.20

ARG UID=1000
ARG GID=1000

# Create a group and user with specified UID and GID
RUN addgroup -g "${GID}" -S pinnaclegroup && adduser -u "${UID}" -S pinnacle -G pinnaclegroup

# Update and upgrade packages
RUN apk update && apk upgrade

# Set the appropriate permissions for PostgreSQL directories
RUN chown -R pinnacle:pinnaclegroup /var/lib/postgresql /var/run/postgresql

# Switch to the non-root user after setting permissions
USER pinnacle

# Set the default command to start PostgreSQL
CMD ["postgres"]
